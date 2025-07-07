import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'
import {toast} from 'react-hot-toast'

const UserSignup = () => {
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: ""
    },
    email: "",
    password: ""
  })

  const [error, setError] = useState({})
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "firstname" || name === "lastname") {
      setUserData(prev => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value
        }
      }))
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validate = () => {
    const errObj = {}
    if (!userData.fullname.firstname) errObj.firstname = "First name is required."
    if (!userData.fullname.lastname) errObj.lastname = "Last name is required."
    if (!userData.email) errObj.email = "Email is required."
    // if (!userData.password) errObj.password = "Password is required and its length must be atleast 6."
    if(!userData.password || userData.password.length < 6)
    {
      errObj.password = "Password is required and must be at least 6 characters long"
    }
    return errObj
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const validation = validate()
    setError(validation)

    if (Object.keys(validation).length === 0) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)

        if (response.status === 201) {
          const data = response.data
          setUser(data.user)
          toast.success("user registerd successfullly :");
          localStorage.setItem("jwt", data.token)

          // Clear form
          setUserData({
            fullname: {
              firstname: "",
              lastname: ""
            },
            email: "",
            password: ""
          })

          navigate('/home')
        }
      } catch (err) {
        console.error("Registration failed:", err)
        toast.error("User registration failed : ");
        setError({ api: "Failed to register. Please try again." })
      }
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" />

        <form onSubmit={submitHandler} className='max-w-md w-full mx-auto'>

          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-2'>
            <input
              name="firstname"
              value={userData.fullname.firstname}
              onChange={handleChange}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
            />
            <input
              name="lastname"
              value={userData.fullname.lastname}
              onChange={handleChange}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
            />
          </div>
          <p className='text-red-500 text-sm mb-4'>{error.firstname || error.lastname}</p>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-1 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />
          <p className='text-red-500 text-sm mb-4'>{error.email}</p>

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            name="password"
            value={userData.password}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-1 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='Password'
          />
          <p className='text-red-500 text-sm mb-4'>{error.password}</p>

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Create account
          </button>

          {error.api && <p className='text-red-500 text-center text-sm'>{error.api}</p>}
        </form>

        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
