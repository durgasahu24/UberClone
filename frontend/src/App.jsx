import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import { UserDataContext } from './context/UserContext.jsx'



function App() {
 const ans = useContext(UserDataContext)


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element = {<UserLogin/>} />
        <Route path='/signup' element = {<UserSignUp/>} />
        <Route path='/captain-login' element = {<CaptainLogin/>} />
        <Route path='/captain-signup' element = {<CaptainSignUp/>} />
      </Routes>
    </div>
  )
}

export default App
