import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserLogin = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormdata] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  }

  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const validate = () => {
    const errObj = {};
    if (!formData.email) errObj.email = "email is required :";
    if (!formData.password || formData.password.length < 6) {
      errObj.password = "password is required and must be atleast 6 character long:"
    }

    return errObj

  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent default behaviour of form which reloads the whole page

    // const userData = {
    //   email: email,
    //   password: password
    // };

    const validation = validate();
    setError(validation);

    if (Object.keys(validation).length === 0) {


      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, formData);
      console.log("response in user login ", response);

      if (response.status == 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('jwt', data.token);
        toast.success("user login successfully ")
        navigate('/home')

        setFormdata({
          email: "",
          password: ""
        })

      }

    }
    else {
      toast.error("user login failed : ")
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto p-4 sm:p-6 md:p-8'>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />
          <p className='text-red-500 text-sm mb-4'>{error.email}</p>

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            value={formData.password}
            onChange={handleChange}
            name='password'
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            type="password"
            placeholder='password'
          />
          <p className='text-red-500 text-sm mb-4'>{error.password}</p>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-1 py-2 max-w-md text-lg placeholder:text-base mx-auto'
        >
          Sign in as Captain
        </Link>

      </div>
    </div>
  );
};

export default UserLogin;

