import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';



const Campaigns = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(() => {
    // Retrieve selected preview from local storage on component mount
    const storedPreview = localStorage.getItem('selectedPreview');
    return storedPreview ? JSON.parse(storedPreview) : null;
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewRef = useRef(null);

  const location = useLocation();

  const templates = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to [Company Name]',
      body: `
        <p>Hello [User Name],</p>
        <p>Welcome to [Company Name]! We're excited to have you join our community.</p>
        <p>...</p>
      `,
    },
    {
      id: 2,
      name: 'Order Confirmation',
      subject: 'Order Confirmation - #[Order ID]',
      body: `
        <p>Dear [Customer Name],</p>
        <p>This email confirms your recent order from [Company Name].</p>
        <p>...</p>
      `,
    },
    {
      id: 3,
      name: 'Password Reset',
      subject: 'Password Reset Instructions',
      body: `
        <p>Hello,</p>
        <p>You have requested a password reset for your [Company Name] account.</p>
        <p>...</p>
      `,
    },
    {
      id: 4,
      name: 'Account Activation',
      subject: 'Activate Your Account',
      body: `
        <p>Hello [User Name],</p>
        <p>Please activate your account by clicking on the following link:</p>
        <p>[Activation Link]</p>
      `,
    },
    {
      id: 5,
      name: 'Event Invitation',
      subject: 'Invitation to [Event Name]',
      body: `
        <p>Dear [Guest Name],</p>
        <p>You are cordially invited to [Event Name] on [Date] at [Time].</p>
        <p>...</p>
      `,
    },
    {
      id: 6,
      name: 'Newsletter',
      subject: 'Latest News and Updates from [Company Name]',
      body: `
        <p>Hello [Subscriber Name],</p>
        <p>Here's the latest news and updates from [Company Name]:</p>
        <p>...</p>
      `,
    },
    {
      id: 7,
      name: 'Feedback Request',
      subject: 'Your Feedback Matters',
      body: `
        <p>Dear [Customer Name],</p>
        <p>We value your feedback! Please take a moment to share your thoughts on your recent experience with [Company Name].</p>
        <p>...</p>
      `,
    },
    {
      id: 8,
      name: 'Birthday Greeting',
      subject: 'Happy Birthday!',
      body: `
        <p>Happy Birthday, [User Name]!</p>
        <p>Wishing you a day filled with joy and happiness.</p>
        <p>...</p>
      `,
    },
    {
      id: 9,
      name: 'Holiday Greetings',
      subject: 'Happy Holidays from [Company Name]',
      body: `
        <p>Happy Holidays from everyone at [Company Name]!</p>
        <p>We wish you a season of peace, joy, and prosperity.</p>
        <p>...</p>
      `,
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleClickOutside = (event) => {
    if (previewRef.current && !previewRef.current.contains(event.target)) {
      handleClosePreview();
    }
  };

  const handleSelectPreview = (template) => {
    setSelectedPreview(template); // Store the selected template data
    localStorage.setItem('selectedPreview', JSON.stringify(template)); // Store selected preview in local storage
    handleClosePreview();
  };
  const handleClearSelectedPreview = () => {
    setSelectedPreview(null);
    localStorage.removeItem('selectedPreview');
  };

  useEffect(() => {
        // Clear selected template when navigating to specific routes
        if (location.pathname === '/' || location.pathname.startsWith('/dashboard/*')) {
            handleClearSelectedPreview();
        }
    }, [location.pathname]); // Only re-run the effect if the location changes



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Templates</h1>

      {selectedPreview ? (
        <div className="bg-green-100 border border-green-400 rounded-md p-4 mb-4">
          <p className="text-green-700">Selected Preview:</p>
          <p>{selectedPreview.name}</p>
          <p>Subject: {selectedPreview.subject}</p>
          <button className="text-red-500 hover:text-red-700 p-2 m-2 ml-10 mr-0 top-0" onClick={() => handleClearSelectedPreview()}>Unselect</button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border p-4 rounded-lg hover:shadow-md cursor-pointer"
            onClick={() => handleTemplateSelect(template)}
          >
            <h2 className="text-lg font-semibold mb-2">{template.name}</h2>
            <p className="text-gray-600 truncate">{template.subject}</p>
          </div>
        ))}
      </div>

      {isPreviewOpen && (
        <div
          ref={previewRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-900/50"
        >
          <div className=" bg-white p-6 rounded-lg shadow-lg">
            <button
              className="flex mb-4 mt-0 ml-[400px] mr-0 py-2 px-4 text-white text-center text-xl  border-1 border-gray-600 bg-red-400 rounded-lg   hover:bg-red-900 hover:text-white"
              onClick={handleClosePreview}
            >
              Close
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedTemplate?.name}</h2>
            <h3 className="text-lg font-semibold mb-2">Subject: {selectedTemplate?.subject}</h3>
            <div dangerouslySetInnerHTML={{ __html: selectedTemplate?.body }} />

            <button
              className="flex mt-4 ml-[auto] mr-0 py-2 px-4 text-white text-center text-xl border-1 border-gray-600 bg-green-400 rounded-lg hover:bg-green-900 hover:text-white"
              onClick={() => handleSelectPreview(selectedTemplate)}
            >
              Select Preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Campaigns