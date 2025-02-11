import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col items-center text-2xl font-bold gap-4">
  <p>Follow Us On</p>
  <div className="flex gap-2">
    <img
      className="w-16 shadow-slate-100 rounded-sm cursor-pointer hover:scale-125 transition-all duration-300"
      src={assets.insta_image}
      alt="Instagram"
    />
    <img
      className="w-16 shadow-slate-100 rounded-sm cursor-pointer hover:scale-125 transition-all duration-300"
      src={assets.linkedin_image}
      alt="LinkedIn"
    />
    <img
      className="w-16 shadow-slate-100 rounded-sm cursor-pointer hover:scale-125 transition-all duration-300"
      src={assets.twitter_image}
      alt="Twitter"
    />
    <img
      className="w-16 shadow-slate-100 rounded-sm cursor-pointer hover:scale-125 transition-all duration-300"
      src={assets.facebook_image}
      alt="Facebook"
    />
  </div>
</div>

      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 my-10 mt-30 text-sm">
        {/* -----------LEFT Section------------- */}
        <div className="flex flex-col items-start gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2">
            <img className="w-14 rounded-lg" src={assets.logo} alt="logo" />
            <p className="text-3xl font-bold">Emailify</p>
          </div>
          <p>Streamline your email outreach with Emailify. <br /> 
          From personalized messages to automated follow-ups. <br />
           </p>
        </div>

        {/* -----------MIDDLE Section------------- */}
        <div>
          <p className="text-xl font-medium mb-5">QUICK LINKS</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Get Started</li>
            <li>Create Account</li>
            <li>Login</li>
            <li>News</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* -----------RIGHT Section------------- */}
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className='underline'>+120-4569-7485</li>
            <li className='underline'>www.emailify@gmail.com</li>
            <p>A01 402 Newyork city , California <br />
             452020, United States</p>
          </ul>
        </div>
      </div>

      {/* -----------Copyright Section------------- */}
      <div>
        <hr className="border-t border-gray-500 w-full m-auto" />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Emailify All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
