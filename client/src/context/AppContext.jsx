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
    const [posts, setPosts] = useState(null)
    const [myPosts, setMyPosts] = useState(null)
    const [friends, setFriends] = useState(null)
    const [showPostAdd, setShowPostAdd] = useState(false)
    const [showPostEdit, setShowPostEdit] = useState(false)


    const fetchUserStatus = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(data.user)
                fetchFriends()
                fetchPosts()
                fetchMyPosts()
            }
        } catch (error) {
            setUser(null)
            setShowUserLogin(true)
        }
    }

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('/api/post')
            if (data.success) {
                const fetched_post = structuredClone(data.posts) // create hard copy of the posts array
                setPosts(fetched_post)
            }
        } catch (error) {
            toast.error("Failed to fetch post!")
            console.log(error)
        }
    }

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/api/post/my-post')
            if (data.success) {
                const fetched_myPost = structuredClone(data.posts) // create hard copy of the posts array
                setMyPosts(fetched_myPost)
            }
        } catch (error) {
            toast.error("Failed to fetch post!")
            console.log(error)
        }
    }

    const fetchFriends = async () => {
        try {
            const { data } = await axios.get('/api/user')
            if (data.success) {
                const fetched_friends = structuredClone(data.user) // create hard copy of the posts array
                setFriends(fetched_friends)
            }
        } catch (error) {
            toast.error("Failed to fetch friends!")
            console.log(error)
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
        posts,
        myPosts,
        fetchPosts,
        fetchMyPosts,
        friends,
        showPostAdd,
        setShowPostAdd,
        showPostEdit, 
        setShowPostEdit,
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
