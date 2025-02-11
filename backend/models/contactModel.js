// models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    minlength: [2, 'Company name must be at least 2 characters'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user's ID
    ref: 'user', // References the userModel
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const contactModel = mongoose.models.contact || mongoose.model('contact', ContactSchema);
export default contactModel;
