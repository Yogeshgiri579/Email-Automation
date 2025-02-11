import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const EmailVerify = () => {


  const navigate = useNavigate()

   const [isVerified, setIsVerified] = useState(false);

  axios.defaults.withCredentials = true;

  const { backendUrl } = useContext(AppContext)

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {

    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {

        inputRefs.current[index].value = char;
      }

    })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join('');

    const storedToken = localStorage.getItem("otpToken"); // Get OTP token

    if (!storedToken) {
        toast.error("OTP token missing. Please register again.");
        return;
    }

    try {
        const { data } = await axios.post(`${backendUrl}/api/user/verify-email`, 
            { otp },
            { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        console.log("Response Data:", data); // Debugging line

        if (data.success) {

            if (data.token) {
                localStorage.setItem("token", data.token);  // ✅ Store token in localStorage
                setIsVerified(true); 
            } else {
                console.error("Token not found in response");
            }

            localStorage.removeItem("otpToken"); // Clean up OTP token
            navigate("/dashboard");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error("Verification Error:", error.response?.data || error);
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};
  useEffect(() => {
    if (isVerified) {
        navigate("/dashboard");
        window.location.reload(); // Ensure full reload after navigation
    }
}, [isVerified, navigate]);


  

  return (
    <div className='flex items-center justify-center min-h-screen 
     bg-gradient-to-br from-blue-200 to-purple-400'>
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded shadow-lg w-96 text-sm'>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6 digit code sent to your email</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type='text' maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C]
         text-white text-center text-xl rounded-md'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white  py-3 rounded-full'> Verify Email</button>
      </form>

    </div>
  )
}

export default EmailVerify