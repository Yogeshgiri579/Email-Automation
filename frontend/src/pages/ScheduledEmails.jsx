import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const ScheduledEmails = () => {
    const { scheduledEmails, getScheduledEmails, cancelScheduledEmail } = useContext(AppContext);

    useEffect(() => {
        getScheduledEmails(); // Fetch scheduled emails on component load
    }, [getScheduledEmails]);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString(); // Format date to readable string
    };

    const truncateBody = (body) => {
        const words = body.split(" ");
        return words.length > 20 ? `${words.slice(0, 20).join(" ")}...` : body;
    };

    const handleCancel = (emailId) => {
        cancelScheduledEmail(emailId);
    };
    


    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Scheduled Emails</h2>
            {scheduledEmails?.length ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Recipients
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Body
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Scheduled Time
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledEmails.map((email, index) => (
                                <tr
                                    key={email.id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-6 py-4 text-gray-700">{email.recipients.join(", ")}</td>
                                    <td className="px-6 py-4 text-gray-700">{email.subject}</td>
                                    <td className="px-6 py-4 text-gray-600">{truncateBody(email.body)}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatDateTime(email.scheduleTime)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleCancel(email._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 mt-4">No scheduled emails.</p>
            )}
        </div>
    );
};

export default ScheduledEmails;
