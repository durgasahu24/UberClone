import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1674395364266-76316bbc82fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYWZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-3 w-full flex justify-between flex-col bg-red-400'>
      <img className='w-20 ml-4' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <div className='bg-white py-7 px-4'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to={'/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Start
