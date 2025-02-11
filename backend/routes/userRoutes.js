import express from "express";
import { registerUser, verifyEmail, loginUser, sendResetOtp, resetPassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);


export default userRouter
