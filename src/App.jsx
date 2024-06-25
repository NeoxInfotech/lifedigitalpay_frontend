import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Register from './screens/auth/register/Register'
import Login from './screens/auth/login/Login'
import Partner from './Client/Partner/Partner'
import { Toaster } from "react-hot-toast"
import { UserContext } from './context/userContext'

const App = () => {
  const { user } = useContext(UserContext)
  const date = user?.createdAt.slice(0, 10)
  const date2 = new Date(Date.now()).toString().slice(0, 10)
  console.log(date, date2)
  return (
    <>
      {!user ? <Header /> : null}
      {
        user ?
          <Partner />
          :
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Home />} />
          </Routes>
      }

      {!user ? <Footer /> : null}
      <Toaster />
    </>
  )
}

export default App
