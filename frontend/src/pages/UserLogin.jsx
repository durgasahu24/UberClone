// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { UserDataContext } from '../context/UserContext';
// import axios from 'axios';

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user, setUser } = React.useContext(UserDataContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // to prevent default behaviour of form which reloads the whole page

//     const userData = {
//       email: email,
//       password: password
//     };


//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
//     console.log("response in user login ", response);

//     if (response.status == 200) {
//       const data = response.data;
//       setUser(data.user);
//       localStorage.setItem('jwt', data.token);
//       navigate('/home')
//     }
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//       <div>
//         <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

//         <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto p-4 sm:p-6 md:p-8'>
//           <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//           <input
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             type="email"
//             placeholder='email@example.com'
//           />

//           <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
//             required
//             type="password"
//             placeholder='password'
//           />

//           <button
//             className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
//           >Login</button>
//         </form>
//         <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
//       </div>
//       <div>
//         <Link
//           to='/captain-login'
//           className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-1 py-2 w-full max-w-md text-lg placeholder:text-base mx-auto'
//         >
//           Sign in as Captain
//         </Link>

//       </div>
//     </div>
//   );
// };

// export default UserLogin;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('jwt', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />

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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm mt-4'>
          New here? <Link to='/signup' className='text-blue-600 font-medium'>Create new Account</Link>
        </p>
      </div>

      {/* Reduced margin between form and captain login button */}
      <div className='max-w-md w-full mx-auto mt-4'>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
