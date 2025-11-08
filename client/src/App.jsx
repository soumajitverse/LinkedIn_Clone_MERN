import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'

const App = () => {
  const {
    user,
    showUserLogin
  } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Navbar />
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App