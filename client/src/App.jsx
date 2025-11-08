import React from 'react'
import Navbar from './components/Navbar'
import PostADD from './components/PostAdd'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import MyPosts from './pages/MyPosts'
import Friends from './pages/Friends'
import EditPost from './components/EditPost'

const App = () => {
  const {
    user,
    showUserLogin,
    showPostAdd,
    showPostEdit,
  } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <div className='fixed top-0 w-full'><Navbar /></div>
      {showUserLogin ? <Login /> : null}
      {showPostEdit ? <EditPost /> : null}

      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-post' element={<MyPosts />} />
        <Route path='/net-work' element={<Friends />} />
      </Routes>
    </div>
  )
}

export default App