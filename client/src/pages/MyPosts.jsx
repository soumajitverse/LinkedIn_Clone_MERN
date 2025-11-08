import React from 'react'
import PostCard from '../components/PostCard'
import { useAppContext } from '../context/AppContext'

const MyPosts = () => {
    const {
        user,
        myPosts,
    } = useAppContext()
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='mt-30'>
                <div className='flex justify-center'>
                    <ul>
                        {user ? (
                            myPosts && myPosts.length > 0 ? (
                                myPosts.map((post) => (
                                    <li key={post._id}>
                                        <PostCard post={post} />
                                    </li>
                                ))
                            ) : (
                                <p>No posts available.</p>
                            )
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyPosts
