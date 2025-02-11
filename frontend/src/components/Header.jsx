import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext)
  return (
    <div className='flex flex-col md:flex-row bg-primary items-center justify-between mt-4 py-5 px-6 rounded-lg overflow-hidden'>
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto'>
       <h1 className='text-7xl font-bold'>Turn Cold Leads into <br /> Warm Opportunities with Ease</h1> <br />
       <p className='text-xl'>Build meaningful connections through the power of personalized, 
        automated cold emails. Our app ensures your message lands where it matters the most.</p>
      <div className='flex flex-col md:flex-row py-10'>
     {
      token ? (

      <button onClick={() => navigate('/dashboard')} className='bg-white text-[24px] text-black py-2 px-4 rounded-lg  m-7 ml-0 hover:scale-125 transition-all duration-300  '>Get Started</button>
      ) : (

      <button onClick={() => navigate('/login')} className='bg-white text-[24px] text-black py-2 px-4 rounded-lg  m-7 ml-0 hover:scale-125 transition-all duration-300  '>Get Started</button>
      )
     }
      </div>
      </div>
      <div className='w-[36%] relative object-contain'>
      <img  className=' rounded-full'src={assets.header_image} alt="" />
      </div>
    </div>
  )
}

export default Header
