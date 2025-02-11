import React from 'react';
import { assets } from '../assets/assets'; // Ensure you have assets properly imported

const Pricing = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      {/* Background Image Section */}
      <div
        className="absolute top-0 w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.money_image})`, // Replace with your image URL
          filter: "blur(3px)",
        }}
      ></div>

      {/* White Background Section */}
      <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>

      {/* Content Section */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center px-8">
        <h1 className="text-4xl font-bold mb-12 text-white">Our Pricing Plans</h1>

        {/* Pricing Cards Section */}
        <div className="flex flex-row justify-center gap-8">
          {/* Basic Plan */}
          <div className="relative bg-white shadow-lg rounded-lg w-80 h-[300px] text-center overflow-hidden">
            {/* Overlay for card content visibility */}
            <div className="absolute inset-0 bg-white bg-opacity-50"></div>

            {/* Card Content */}
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-green-500 mb-4">$10/month</h2>
              <ul className="text-black text-sm mb-3 space-y-2 mt-6">
                <li>✔ Access to basic features</li>
                <li>✔ 5 Email Templates</li>
                <li>✔ Basic Support</li>
              </ul>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-10 hover:scale-110 transition-all duration-300">
                Pay Now
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white shadow-lg rounded-lg w-80 h-[300px] text-center overflow-hidden">
            {/* Overlay for card content visibility */}
            <div className="absolute inset-0 bg-white bg-opacity-50"></div>

            {/* Card Content */}
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-green-500 mb-4">$30/month</h2>
              <ul className="text-black text-sm mb-3 space-y-2 mt-6">
                <li>✔ Everything in Basic</li>
                <li>✔ 20 Email Templates</li>
                <li>✔ Priority Support</li>
              </ul>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-10 hover:scale-110 transition-all duration-300">
                Pay Now
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-white shadow-lg rounded-lg w-80 h-[300px] text-center overflow-hidden">
            {/* Overlay for card content visibility */}
            <div className="absolute inset-0 bg-white bg-opacity-50"></div>

            {/* Card Content */}
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-green-500 mb-4">$50/month</h2>
              <ul className="text-black text-sm mb-3 space-y-2 mt-6">
                <li>✔ Everything in Pro</li>
                <li>✔ Unlimited Email Templates</li>
                <li>✔ Dedicated Account Manager</li>
              </ul>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-10 hover:scale-110 transition-all duration-300">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
