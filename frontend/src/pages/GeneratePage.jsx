import React, { useContext, useState, useEffect } from 'react';
import runChat from '../Config/gemini.js';
import Select from 'react-select';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal'

const GeneratePage = () => {
    const { contacts, sendEmail, scheduleEmail } = useContext(AppContext);
    const [selectionMode, setSelectionMode] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [template, setTemplate] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [isEmailGenerated, setIsEmailGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode
    const [editedContent, setEditedContent] = useState(''); // To hold edited content

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        try {
            const savedTemplate = localStorage.getItem('selectedPreview');
            if (savedTemplate) {
                const parsedTemplate = JSON.parse(savedTemplate);
                setTemplate(parsedTemplate); // Set the template object in state
            } else {
                console.log('No template found in LocalStorage.');
            }
        } catch (error) {
            console.error('Error retrieving template from LocalStorage:', error);
        }
    }, []);

    const handleSelectAll = () => {
        // Set all contacts as selected
        setSelectedContacts(
            contacts.map((contact) => ({
                value: contact._id,
                label: `${contact.name} (${contact.email})`,
            }))
        );
        setSelectionMode('all');
        toast.success('All contacts selected!');
    };

    const handleCustomSelect = () => {
        // Clear selection and enable custom mode
        setSelectedContacts([]);
        setSelectionMode('custom');
        toast.info('Custom selection enabled.');
    };


    const generateEmailWithAI = async () => {
        if (!template || selectedContacts.length === 0) {
            toast.error('Please select a template and at least one contact.');
            return;
        }

        setLoading(true); // Show loading state
        let hasError = false;

        for (const contact of selectedContacts) {
            const selectedContact = contacts.find((c) => c._id === contact.value);
            if (!selectedContact) continue;


            const prompt = `
     Create a detailed, personalized email based on the following information:
    - Template Subject: ${template.subject}
    - Template Body: ${template.body}
    - Contact Name: ${selectedContact.name || 'User'}
    - Company Name: ${selectedContact.company || 'Company'}

    Make the email engaging, professional, and provide additional details about the company's mission, benefits, and how they can reach out for support. Ensure the email sounds warm and welcoming.

    Example Structure:
    - Greeting
    - Introduction (include the contact's name and why you're reaching out)
    - Main content (elaborate on the company's services, opportunities, or benefits)
    - Closing (encourage further contact or provide next steps)
`;


            try {
                const generatedContent = await runChat(prompt);
                setEmailContent((prevContent) => `${prevContent}\n\n${generatedContent}`); // Append content
                setEditedContent((prevContent) => `${prevContent}\n\n${generatedContent}`); // Append edited content
            } catch (error) {
                console.error('Error generating email for:', selectedContact.email, error);
                hasError = true;
            }
        }

        setLoading(false);
        setIsEmailGenerated(true);

        // Show single toast after processing all contacts
        if (hasError) {
            toast.warn('Some email content could not be generated. Please check the logs.');
        } else {
            toast.success('Email content generated successfully for all contacts!');
        }
    };

    const handleSendEmail = async () => {
        if (!isEmailGenerated) {
            toast.error('Please generate an email first.');
            return;
        }

        let hasError = false;

        for (const contact of selectedContacts) {
            const selectedContact = contacts.find((c) => c._id === contact.value);
            if (!selectedContact) continue;

            try {
                await sendEmail(
                    selectedContact.email,
                    template.subject, // Customize subject as needed
                    emailContent
                );
            } catch (error) {
                console.error('Error sending email to:', selectedContact.email, error);
                hasError = true;
            }
        }

        // Show single toast after sending emails to all contacts
        if (hasError) {
            toast.warn('Some emails could not be sent. Please check the logs.');
        } else {
            toast.success('All emails sent successfully!');
        }
    };

    const handleScheduleEmail = async () => {
        if (!isEmailGenerated || !scheduleDate) {
            toast.error('Please generate an email and select a schedule date.');
            return;
        }

        let hasError = false;

        for (const contact of selectedContacts) {
            const selectedContact = contacts.find((c) => c._id === contact.value);
            if (!selectedContact) continue;

            try {
                await scheduleEmail(
                    selectedContact.email,
                    template.subject,
                    emailContent,
                    scheduleDate
                );
            } catch (error) {
                console.error('Error scheduling email to:', selectedContact.email, error);
                hasError = true;
            }
        }

        setIsModalOpen(false); // Close the modal

        if (hasError) {
            toast.warn('Some emails could not be scheduled. Please check the logs.');
        } else {
            toast.success('All emails scheduled successfully!');
        }
    };


    const contactOptions = contacts.map((c) => ({
        value: c._id,
        label: `${c.name} (${c.email})`,
    }));

    const toggleEditMode = () => {
        // If toggling to editing mode, ensure `editedContent` is set to `emailContent`
        if (!isEditing) {
            setEditedContent(emailContent);
        }
        setIsEditing(!isEditing); // Toggle edit mode
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Generate  Automation</h1>

            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                {/* Contact Selection */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={handleSelectAll}
                        className={`px-4 py-2 rounded-lg ${selectionMode === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            } transition duration-200`}
                    >
                        Select All Contacts
                    </button>
                    <button
                        onClick={handleCustomSelect}
                        className={`px-4 py-2 rounded-lg ${selectionMode === 'custom'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-500 text-white hover:bg-green-600'
                            } transition duration-200`}
                    >
                        Custom Select
                    </button>
                </div>
                {/* Contact Selection */}
                {selectionMode === 'custom' && (
                    <div>
                        <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                            Select Contacts:
                        </label>
                        <Select
                            options={contactOptions}
                            isMulti
                            onChange={(selectedOptions) => setSelectedContacts(selectedOptions)}
                            value={selectedContacts}
                            className="w-full"
                            placeholder="Select Contacts..."
                        />
                    </div>
                )}

                {/* Template Selection */}
                <div className=" bg-gray-50 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Selected Template</h1>
                    {/* Reduced `mb-6` to `mb-4` for less spacing */}
                    {template ? (
                        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                            {/* Reduced `space-y-6` to `space-y-4` */}
                            <h2 className="text-xl font-bold text-gray-800">Template Details</h2>
                            <p><strong>Name:</strong> {template.name}</p>
                            <p><strong>Subject:</strong> {template.subject}</p>
                            <div>
                                <strong>Body:</strong>
                                <div
                                    className="border border-gray-300 rounded-md p-4 mt-2"
                                    dangerouslySetInnerHTML={{ __html: template.body }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No template selected or available in LocalStorage.</p>
                    )}
                </div>
                {/* Generate Email Button */}
                <div>
                    <button
                        onClick={generateEmailWithAI}
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Generating...' : 'Generate Email with AI'}
                    </button>
                </div>

                {/* Email Preview */}
                {isEmailGenerated && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Email Preview:</h2>
                        {isEditing ? (
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-4 text-gray-700"
                                rows="8"
                            />
                        ) : (
                            <textarea
                                value={emailContent}
                                readOnly
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-4 text-gray-700"
                                rows="8"
                            />
                        )}
                    </div>
                )}

                {/* Edit and Send Email Buttons */}
                {isEmailGenerated && (
                    <div className="flex space-x-4">
                        <button
                            onClick={toggleEditMode}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                            {isEditing ? 'Done Editing' : 'Edit Email'}
                        </button>
                        <button
                            onClick={handleSendEmail}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Send Email
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal on click
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                        >
                            Schedule Email
                        </button>
                        {/* Modal for scheduling email */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Schedule Email Modal"
                            ariaHideApp={false}
                            className="bg-white rounded-lg shadow-lg p-6 w-1/2 mx-auto mt-20"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule Email</h2>
                            <p className="text-gray-700 mb-4">Select a date and time to schedule your email:</p>
                            <DatePicker
                                selected={scheduleDate}
                                onChange={(date) => setScheduleDate(date)} // Update state on date change
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Select date and time"
                                className="w-full border-gray-300 rounded-md p-2 mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScheduleEmail}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Schedule
                                </button>
                            </div>
                        </Modal>
                    </div>


                )

                }
            </div>
        </div>
    );
};

export default GeneratePage;
