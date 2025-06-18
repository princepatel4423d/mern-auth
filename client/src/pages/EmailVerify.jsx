import React, { useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);

  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').split('');
    paste.forEach((char, index) => {
      if (index < inputRefs.current.length) {
        inputRefs.current[index].value = char;
        if (char && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value).join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { userId: userData?._id, otp: otpArray });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedIn, userData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-20 h-12" />
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h2>
          <p className='text-center mb-4'>Enter 6-digit code sent to your email id</p>
          <div className="flex gap-2 justify-center mt-6" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                key={index}
                type="text"
                maxLength={1}
                required
                ref={(e) => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer">Verify email</button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
