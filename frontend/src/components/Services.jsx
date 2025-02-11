import React from 'react';
import { assets } from '../assets/assets';

const Services = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
            <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
                Our services are designed to help you connect with your audience and grow your business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.ai_image} alt="AI Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Personalization</h3>
                    <p className="text-sm text-gray-600">
                        AI-generated content suggestions to make emails more engaging.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.automation_image} alt="Automation Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Automated Follow-Ups</h3>
                    <p className="text-sm text-gray-600">
                        Schedule follow-up emails based on recipient behavior (e.g., no reply or link click).
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.schedule_image} alt="Schedule Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Scheduling</h3>
                    <p className="text-sm text-gray-600">
                        Allow users to send emails at optimal times based on the recipient's time zone or user preferences.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.analytics_image} alt="Analytics Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics & Reporting</h3>
                    <p className="text-sm text-gray-600">
                        Track email performance and analyze data to improve email campaigns.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.followup_image} alt="Follow-Up Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Warm-Up Services</h3>
                    <p className="text-sm text-gray-600">
                        Gradually increase email sending volume to improve domain reputation and avoid being flagged as spam.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                    <img className="w-24 h-24 mb-4" src={assets.userfriendly_image} alt="Follow-Up Image" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">User Friendly Ecosystem</h3>
                    <p className="text-sm text-gray-600">
                        Easy-to-use interface for creating and sending emails.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
