import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Contacts = () => {
  const { contacts, getContacts, createContact, updateContact, deleteContact } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleSave = async () => {
    const contactData = { email, company, name };

    if (isEditing) {
      // Update contact
      await updateContact(editingId, contactData);
    } else {
      // Create new contact
      await createContact(contactData);
    }

    // Clear form fields
    setEmail('');
    setCompany('');
    setName('');

    // Reset editing state
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id, contact) => {
    setEmail(contact.email);
    setCompany(contact.company);
    setName(contact.name);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
  };

  const handleCancel = () => {
    // Clear form fields and reset editing state
    setEmail('');
    setCompany('');
    setName('');
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>

      {/* Input Form */}
      <div className="flex gap-4 mb-4">
        <input
          type="email"
          placeholder=" Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder=" Your Organization Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Recipient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        
        {isEditing ? (
          <>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        )}
      </div>

      {/* Contacts List */}
      <div>
        {contacts.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2"> Recipient Email</th>
                <th className="border border-gray-300 p-2">Organization Name</th>
                <th className="border border-gray-300 p-2">User Name</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="text-center">
                  <td className="border border-gray-300 p-2">{contact.email}</td>
                  <td className="border border-gray-300 p-2">{contact.company}</td>
                  <td className="border border-gray-300 p-2">{contact.name}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(contact._id, contact)}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(contact._id)} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No contacts added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;