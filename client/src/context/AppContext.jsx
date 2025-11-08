import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    // Fetch User Status (Check Login or not) and Cart Items
    const fetchUserStatus = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(data.user)
            }
        } catch (error) {
            setUser(null)
            setShowUserLogin(true)
        }
    }

    useEffect(() => {
        fetchUserStatus()
    }, [])


    const value = {
        navigate,
        user,
        setUser,
        showUserLogin,
        setShowUserLogin,
        fetchUserStatus,
        axios,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
