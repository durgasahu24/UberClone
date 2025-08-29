

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captain = {
      email,
      password
    };


    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);
      console.log("login response ", response);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        toast.success("Captain login successfully ");
        navigate('/captain-home');
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message)

      console.log("errro captain login ; ", error)
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="logo" />

        <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto p-4 sm:p-6 md:p-8'>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Login
          </button>
        </form>

        <p className='text-center'>
          Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
        </p>
      </div>

      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-1 py-2 max-w-md text-lg placeholder:text-base mx-auto'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
