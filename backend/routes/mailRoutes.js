import express from "express";
import authUser from "../middlewares/authUser.js";
import scheduleEmail, { cancelScheduledEmail, getScheduledEmails } from "../controllers/scheduleEmail.js";
import sendEmail from "../controllers/emailSender.js";

const mailRouter = express.Router()

mailRouter.post('/send-email',authUser,sendEmail)
mailRouter.post('/schedule-email',authUser,scheduleEmail)
mailRouter.get('/get-scheduled-emails',authUser,getScheduledEmails)
mailRouter.delete('/cancel-scheduled-email/:emailId',authUser,cancelScheduledEmail)



export default mailRouter