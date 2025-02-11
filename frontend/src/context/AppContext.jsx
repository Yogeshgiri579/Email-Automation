import { createContext, useState, useCallback, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

     const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [scheduledEmails, setScheduledEmails] = useState([]);

    


useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
    }
}, []);





    const getContacts = useCallback(async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`${backendUrl}/api/contact/get-contact`);
            setContacts(data.data);
        } catch (error) {
            console.error(error);
        }
    }, [backendUrl]);

    const createContact = useCallback(
        async (contact) => {
            try {
                const { data } = await axios.post(`${backendUrl}/api/contact/create-contact`, contact);

                toast.success(data.message);
                setContacts([...contacts, data.data]);

                await getContacts(); // Fetch updated contacts
            } catch (error) {
                console.error(error);
            }
        },
        [backendUrl, getContacts]
    );

    const updateContact = useCallback(
        async (id, contact) => {
            try {
                const { data } = await axios.post(`${backendUrl}/api/contact/update-contact/${id}`, contact);
                toast.success(data.message);
                await getContacts(); // Fetch updated contacts
            } catch (error) {
                console.error(error);
            }
        },
        [backendUrl, getContacts]
    );

    const deleteContact = useCallback(
        async (id) => {
            try {
                const { data } = await axios.delete(`${backendUrl}/api/contact/delete-contact/${id}`);
                toast.success(data.message);
                await getContacts(); // Fetch updated contacts
            } catch (error) {
                console.error(error);
            }
        },
        [backendUrl, getContacts]
    );

    const sendEmail = useCallback(
        async (recipients, subject, body) => {
            try {
                axios.defaults.withCredentials = true;

                // Make sure recipients is an array
                const recipientsArray = Array.isArray(recipients) ? recipients : [recipients];

                const { data } = await axios.post(
                    `${backendUrl}/api/mail/send-email`,
                    { recipients: recipientsArray, subject, body }, // Use the array
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                toast.success();
            } catch (error) {
                console.error("Axios error:", error);
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        },
        [backendUrl]
    );
    const scheduleEmail = useCallback(
        async (recipients, subject, body, scheduleTime) => {
            try {
                axios.defaults.withCredentials = true;

                // Ensure recipients is an array
                const recipientsArray = Array.isArray(recipients) ? recipients : [recipients];

                const { data } = await axios.post(
                    `${backendUrl}/api/mail/schedule-email`,
                    { recipients: recipientsArray, subject, body, scheduleTime }, // Pass the scheduling time
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );



            } catch (error) {
                console.error("Axios error:", error);
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        },
        [backendUrl]
    );

    const getScheduledEmails = useCallback(async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.get(`${backendUrl}/api/mail/get-scheduled-emails`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setScheduledEmails(data.tasks); // Use `tasks` key from response


            } else {
                toast.error("Failed to fetch scheduled emails.");
            }
        } catch (error) {
            console.error("Error fetching scheduled emails:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }, [backendUrl, token]);


    // Cancel a scheduled email by ID
    const cancelScheduledEmail = useCallback(
        async (emailId) => {
            try {
                axios.defaults.withCredentials = true;

                const { data } = await axios.delete(`${backendUrl}/api/mail/cancel-scheduled-email/${emailId}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Use token if required for authentication

                });
                console.log(data);

                toast.success(data.message);
                await getScheduledEmails();
                // setScheduledEmails(prevEmails => prevEmails.filter(email => email.id !== emailId));// Update state by removing canceled email
            } catch (error) {
                console.error("Error canceling scheduled email:", error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        },
        [backendUrl, token]
    );

    useEffect(() => {
        // Fetch scheduled emails on component mount
        if (token) {
            getScheduledEmails();
        }
    }, [getScheduledEmails, token]);



    useEffect(() => {
        getContacts();
    }, [getContacts]);

    const value = {
        token,
        setToken,
        backendUrl,
        user,
        setUser,
        contacts,
        setContacts,
        getContacts,
        createContact,
        updateContact,
        deleteContact,
        sendEmail,
        scheduleEmail,
        scheduledEmails,
        setScheduledEmails,
        getScheduledEmails,
        cancelScheduledEmail

    };

    return (
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
};

export default AppContextProvider;
