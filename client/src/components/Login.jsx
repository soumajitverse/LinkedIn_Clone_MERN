import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets.js';

const Login = () => {

    const {
        navigate,
        setUser,
        setShowUserLogin,
        axios,
        fetchUserStatus,
    } = useAppContext()

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false)

    // function to handle submit
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post(`/api/user/${state}`, { name, email, password })
            console.log(data)
            if (data.success) {
                if (state === 'login') {
                    toast.success("Logged in successfully")
                    fetchUserStatus() // add this for fetching real time cart data for user from DB
                }
                else {
                    toast.success("Signed up successfully")
                }
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50'>

            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full mb-2">
                    <p>Password</p>

                    <div className='relative'>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 pr-10 outline-primary"
                            type={showPass ? "text" : "password"}
                            required
                        />
                        <span
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100 transition z-10"
                        >
                            <img
                                className='w-5 h-5'
                                src={showPass ? assets.eye_hide : assets.eye_show}
                                alt={showPass ? 'eye_hide' : 'eye_show'}
                            />
                        </span>
                    </div>
                </div>

                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>

                <div className='w-full flex justify-center'>
                    {state === "register" ? (
                        <p>
                            Already have account?<span onClick={() => setState("login")} className="text-primary cursor-pointer hover:underline"> click here</span>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?<span onClick={() => setState("register")} className="text-primary cursor-pointer hover:underline"> click here</span>
                        </p>
                    )}
                </div>

            </form>
        </div>
    )
}

export default Login
