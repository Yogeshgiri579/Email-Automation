import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DemoPage = () => {
  const [toEmailText, setToEmailText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();
  const {token} = useContext(AppContext)

  const typingIndex = useRef({ field: "toEmail", index: 0 }); // Tracks which field and character index is being typed.
  const typingInterval = useRef(null); // Stores the interval ID.
  const formRef = useRef(null);

  const toEmail = "Hiring Manager Email";
  const subject = "An Application for Full Stack Developer Position";
  const message = `Dear Hiring Manager,

I hope you are doing well. I am [Your Name], a final-year student at [Your University] studying [Your Field of Study]. I am eager to join your team and contribute my skills to [Your Project Name].
Please find my resume attached. I am confident that my skills and experience make me a valuable addition to your team. I look forward to the opportunity to learn and grow with you.`;

  const resetFields = () => {
    setToEmailText("");
    setSubjectText("");
    setMessageText("");
    typingIndex.current = { field: "toEmail", index: 0 };
  };

  const typeNextCharacter = () => {
    const { field, index } = typingIndex.current;
    let targetText = "";

    if (field === "toEmail") targetText = toEmail;
    if (field === "subject") targetText = subject;
    if (field === "message") targetText = message;

    if (index < targetText.length) {
      // Add the next character to the respective field
      const nextChar = targetText[index];
      if (field === "toEmail") setToEmailText((prev) => prev + nextChar);
      if (field === "subject") setSubjectText((prev) => prev + nextChar);
      if (field === "message") setMessageText((prev) => prev + nextChar);

      typingIndex.current.index += 1; // Move to the next character
    } else {
      // Move to the next field when the current one is done
      if (field === "toEmail") typingIndex.current = { field: "subject", index: 0 };
      else if (field === "subject") typingIndex.current = { field: "message", index: 0 };
      else stopTyping(); // Stop typing when all fields are done
    }
  };

  const startTyping = () => {
    resetFields();
    typingInterval.current = setInterval(typeNextCharacter, 100); // Adjust typing speed here
  };

  const stopTyping = () => {
    clearInterval(typingInterval.current);
    typingInterval.current = null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTyping(true); // Form is in view
        } else {
          setIsTyping(false); // Form is out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the form is visible
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      startTyping();
    } else {
      stopTyping();
    }
  }, [isTyping]);

  return (
    <div className="relative w-screen h-screen overflow-y-scroll">
      {/* Heading */}
      <h1
        className="absolute top-1 left-0 w-full text-center text-3xl font-bold text-black cursor-none z-20"
        style={{ textShadow: "2px 2px 4px rgba(227, 238, 241, 0.8)" }}
      >
        What Emailify Do 😉
      </h1>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm z-0"
        style={{ backgroundImage: `url(${assets.bgemail})` }}
      ></div>

      {/* Centered Content */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 border border-gray-200 shadow-lg">
        {/* Container for the form */}
        <div
          ref={formRef}
          className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-[95%] md:w-[50%] lg:w-[40%] relative z-10"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-2">
            An Application for Full Stack Developer Position
          </h2>

          {/* Form Section */}
          <form className="space-y-4">
            {/* To Field */}
            <div>
              <label htmlFor="toEmail" className="block text-sm font-medium text-gray-600">
                To
              </label>
              <input
                type="text"
                id="toEmail"
                value={toEmailText}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black-500"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-600">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subjectText}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                rows="8"
                value={messageText}
                disabled
                wrap="hard"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black-500 resize-none overflow-hidden"
              ></textarea>
            </div>


            {/* Submit Button */}
            <div>
              {
                token ? (
                  <button type="button" onClick={() => navigate('/dashboard')} className="w-1/3 bg-blue-500 text-white font-sm border border-white py-3 rounded-full cursor-pointer hover:scale-110 transition-all duration-300">
                Send Now 
              </button>
                ) : (
                  <button type="button" onClick={() => navigate('/login')} className="w-1/3 bg-blue-500 text-white font-sm border border-white py-3 rounded-full cursor-pointer hover:scale-110 transition-all duration-300">
                Send Now 
              </button>
                )
              }
              
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
