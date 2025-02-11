import React from 'react';
import { assets } from '../assets/assets';
import { MdCall } from "react-icons/md";
import { BsWechat } from "react-icons/bs";

const ContactUs = () => {
  return (
    <div>
      {/* Top Image and Text Section */}
      <div className="relative flex flex-1 flex-row items-start justify-between min-h-screen bg-gray-200">
        <div className="flex flex-1 flex-row items-start bg-[#212121] w-1/2 h-[51vh] justify-between gap-1">
          <img
            src={assets.contact_image}
            alt="Contact Icons"
            className="w-[55%] h-[51vh] object-cover rounded-r-full"
          />
          <div className="flex flex-col items-start gap-4 flex-1">
            <p className="text-6xl text-white font-bold mt-2">Get in Touch</p>
            <p className="text-xl text-white m-5">
              Want to get in touch with us? We'd love to hear from you! Here are <br /> some ways to reach out:
            </p>
          </div>
        </div>

        {/* Call and Chat Cards */}
        <div className="absolute flex gap-8  left-[31%] bottom-[13%]">
          {/* Call Card */}
          <div className="flex flex-col items-center justify-center bg-gray-100 w-[570px] h-[50vh] rounded-lg shadow-lg p-4">
            <MdCall className="text-blue-500 text-6xl mb-10 mt-0 " />
            <h3 className="text-4xl font-semibold text-gray-800 mb-7">Talk to US</h3>
            <p className="text-gray-600 text-xl">Interested in talking to us ? Just pick the phone <br /> to chat with a member of our team</p>
            <ul className='text-xl mt-5 gap-5 underline'>
              <li className='flex items-center gap-2 text-blue-500 mt-8 cursor-pointer'>+81 234567890</li>
              <li className='flex items-center gap-2 text-blue-500 mt-8 mb-2 cursor-pointer'>get all our global contacts</li>
            </ul>
          </div>

          {/* Chat Card */}
          <div className="flex flex-col items-center justify-center bg-gray-100 w-[570px] h-[50vh] rounded-lg shadow-lg p-4">
            <BsWechat className="text-green-500 text-6xl mb-10 mt-0" />
            <h3 className="text-4xl mb-6 mt-5 font-semibold text-gray-800">Chat with Us</h3>
            <p className="text-gray-600 text-xl">Sometimes you need a little help from your friends or a support reply. <br /> Don't worry.. we are here for you</p>
            <button className='bg-orange-600 text-white mt-4 py-2 px-4 rounded-lg m-7 ml-0 hover:scale-125 transition-all duration-300 '>Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
