import React from 'react';
import { assets } from '../assets/assets';


const AboutUs = () => {
  return (
    <div className='sm:mx-10 mx-[10%] border border-gray-700 shadow-lg rounded-md mb-3 mt-4'>
      
      <div className='text-center text-2xl pt-10 text-slate-900  '>
        <p>ABOUT <span>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row  gap-12 ml-10'>
        <img className='w-full md:max-w-[360px] rounded-md' src={assets.happy_image} alt="" />
        <div className='flex flex-col justify-center ml-11 gap-6 md:w-2/4 text-xl text-gray-600 '>
          <p>Welcome to our cold email platform! We specialize in helping businesses craft impactful emails that spark connections and drive growth.
          </p>
          <p> Our intuitive tools and proven strategies make reaching your audience effortless and effective We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our intuitive tools and proven strategies make reaching your audience effortless and effective.
            Whether you're nurturing leads or expanding your network, we’re here to help you succeed with personalized, results-driven email campaigns.
            Let’s transform your outreach into meaningful relationships..</p>
        </div>
        
      </div>
      
      

    </div>
    

  );
};

export default AboutUs;
