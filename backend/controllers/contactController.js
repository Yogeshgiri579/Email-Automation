import contactModel from '../models/contactModel.js'; // Import the contact model

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { email,company ,name  } = req.body;
    const userId = req.user.id; 

    // Validate request body
    if (!email || !company ||!name  ) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newContact = new contactModel({ email,company,name, userId }); // Use the correct model name
    await newContact.save();

    res.status(201).json({ success: true, message: 'Contact created successfully', data: newContact });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const userId = req.user.id
    
    const contacts = await contactModel.find({ userId }); // Use the correct model name
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, company, name } = req.body;
    const userId = req.user.id; 

    const updatedContact = await contactModel.findByIdAndUpdate( // Use the correct model name
      { _id: id, userId },
      { email,  company , name },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, message: 'Contact updated successfully', data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedContact = await contactModel.findByIdAndDelete({ _id: id, userId }); // Use the correct model name

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export { createContact, getAllContacts, updateContact, deleteContact };
