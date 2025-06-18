import React, { use, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/');

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <nav className="px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <img className='w-20 h-12' src={assets.logo} alt="" />
        {userData ?
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div>
          :
          < button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-4xl text-white">
            Login
          </button>
        }
      </div>
    </nav >
  );
};

export default Navbar;