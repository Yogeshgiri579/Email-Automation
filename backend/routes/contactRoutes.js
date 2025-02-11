// routes/contactRoutes.js
import express from "express";
import {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import validateContact from "../middlewares/validateContact.js";
import authUser from "../middlewares/authUser.js";


const contactRouter = express.Router();

// Create a new contact
contactRouter.post('/create-contact',authUser, validateContact, createContact);

// Get all contacts
contactRouter.get('/get-contact',authUser, getAllContacts);

// Update a contact
contactRouter.post('/update-contact/:id',authUser, validateContact, updateContact);

// Delete a contact
contactRouter.delete('/delete-contact/:id',authUser, deleteContact);

// sendEmail


 export default contactRouter
