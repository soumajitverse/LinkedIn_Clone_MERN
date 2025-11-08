import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {
        navigate,
        user,
        setUser,
        setShowUserLogin,
        axios,
        setShowPostAdd,
        showPostAdd,
    } = useAppContext()

    // function to logout
    const logout = async () => {
        try {
            const { data } = await axios.post('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                navigate('/')
                setUser(null)
                setShowUserLogin(true)
            }
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }

    return user ? (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-50 transition-all">

            <NavLink to='/' onClick={() => setOpen(false)}>
                <div className="text-primary font-bold text-2xl">ProNet</div>
            </NavLink>

            <div className='font-medium text-xl'>
                Hi, {user.name}
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <button onClick={() => {
                    setShowPostAdd(true)
                }} className='cursor-pointer'>Add Post</button>
                <NavLink to='/'>Feed</NavLink>
                <NavLink to='/net-work'>Friends</NavLink>

                {/* login and logout*/}
                {/* if user is logged in then it will show the logout button and if the user is not logged in then it will show the login button */}
                {!user ?
                    (<button
                        onClick={() => {
                            setOpen(false)
                            setShowUserLogin(true)
                        }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>) :
                    (
                        <div className='relative group'>

                            {
                                user.profileImage ? <img className='w-10 h-10 rounded-3xl' src={user.profileImage} alt="profile" /> : <img className='w-10 h-10' src={assets.profile_icon} alt="profile" />
                            }

                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                <li
                                    onClick={() => { navigate('my-profile') }}
                                    className='p-1.5 pl-3 
                            hover:bg-primary/10 cursor-pointer'>My Profile</li>
                                <li
                                    onClick={() => { navigate('my-post') }}
                                    className='p-1.5 pl-3 
                            hover:bg-primary/10 cursor-pointer'>My Posts</li>

                                <li
                                    onClick={logout}
                                    className='p-1.5 pl-3 
                            hover:bg-primary/10 cursor-pointer'>Logout</li>

                            </ul>
                        </div>)
                }
            </div>

            <div className='flex items-center sm:hidden'>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden"> <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (<div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}>
                <NavLink to='/my-profile' onClick={() => setOpen(false)}>My Profile</NavLink>
                <button onClick={
                    () => {
                        setOpen(false)
                        setShowPostAdd(true)
                    }
                } className='cursor-pointer'>Add Post</button>
                <NavLink to='/' onClick={() => setOpen(false)}>Feed</NavLink>
                <NavLink to='/net-work' onClick={() => setOpen(false)}>Friends</NavLink>
                <NavLink to='/my-post' onClick={() => setOpen(false)}>My Posts</NavLink>

                {/* login and logout*/}
                {/* if user is logged in then it will show the logout button and if the user is not logged in then it will show the login button */}
                {!user ?
                    (<button
                        onClick={() => {
                            setOpen(false)
                            setShowUserLogin(true)
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>) :
                    (
                        <button
                            onClick={() => {
                                setOpen(false)
                                logout()
                            }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>)
                }

            </div>
            )}

        </nav >
    ) : (<nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-50 transition-all">
        <div className="text-primary font-bold text-2xl cursor-pointer">ProNet</div>
    </nav>)
}

export default Navbar