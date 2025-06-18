import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ?  toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value).join('');
    setOtp(otpArray);
    setIsOtpSubmited(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {!isEmailSent &&
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-20 h-12" />
          </div>

          <form onSubmit={onSubmitEmail} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
            <p className="text-center mb-4">Enter your registered email address</p>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer">Submit</button>
          </form>
        </div>
      }

      {/* otp input form */}
      {!isOtpSubmited && isEmailSent &&
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-20 h-12" />
          </div>

          <form onSubmit={onSubmitOtp} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Reset Password OTP</h2>
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
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer">Submit</button>
          </form>
        </div>
      }

      {/* enter new password form */}
      {isOtpSubmited && isEmailSent &&
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-20 h-12" />
          </div>

          <form onSubmit={onSubmitNewPassword} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">New Password</h2>
            <p className="text-center mb-4">Enter the new password below</p>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="New Password"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer">Submit</button>
          </form>
        </div>
      }

    </div>
  )
}

export default ResetPassword