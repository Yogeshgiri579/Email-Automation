import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const {token,setToken} = useContext(AppContext);

  const logout =()=>{
        setToken(false)
        localStorage.removeItem('token')
        localStorage.removeItem('selectedPreview');
     }

    

  return (
    <div className='flex justify-between items-center text-[18px] py-4 mb-1 border-b border-b-gray-400 '>
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
        <img className="w-14 rounded-lg" src={assets.logo} alt="logo" />
        <p className='text-3xl font-bold'>Emailify</p>
      </div>
      <ul className='hidden md:flex items-start gap-5 font-medium '>
            <NavLink to='/'>
                 <li className='py-1'>Home</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            
            <NavLink to='/about'>
                 <li className='py-1'>About</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                 <li className='py-1'>Contact</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/pricing'>
                 <li className='py-1'>Pricing</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
          {
            token  ?  <div>
             <div className ='flex items-center gap-2 cursor-pointer group relative' >
              <img className='w-20' src={assets.user_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block' >
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/dashboard')} className='hover:text-black'>Dashboard</p>
                <p onClick={logout} className='hover:text-black'>Log Out</p>
                </div>
              </div>
             </div>
            </div>
            :
        <button onClick={() => navigate('/login')} className='bg-black text-white px-4 py-2 rounded-full text-sm '>Create Account</button>
          }
          <img onClick={() => setShowMenu(true)} className='w-9 cursor-pointer md:hidden' src={assets.menu_icon} alt="" />
          {/* --------MObile Menu----- */}
          <div className={`${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden  top-0 right-0 bottom-0 overflow-hidden bg-white z-20 transition-all`}>
               <div className='flex justify-between items-center p-4'>
                    <img className='w-14' src={assets.logo} alt="" />
                    <img onClick={() => setShowMenu(false)} className='w-9 cursor-pointer md:hidden' src={assets.menu_icon} alt="" />
               </div>
               <ul className='flex flex-col gap-4 p-4 items-center mt-5 px-5 text-lg font-medium'>
                    <NavLink   onClick={()=>setShowMenu(false)} to={'/'}><p className={`px-4 py-2 rounded inline-block`}>Home</p></NavLink>
                    <NavLink   onClick={()=>setShowMenu(false)} to={'/about'}><p className={`px-4 py-2 rounded inline-block`}>ABOUT</p></NavLink>
                    <NavLink   onClick={()=>setShowMenu(false)} to={'/contact'}><p className={`px-4 py-2 rounded inline-block`}>CONTACT</p></NavLink>
                    <NavLink   onClick={()=>setShowMenu(false)} to={'/pricing'}><p className={`px-4 py-2 rounded inline-block`}>Pricing</p></NavLink>

               </ul>
          </div>
        </div>

    </div>
  )
}

export default Navbar