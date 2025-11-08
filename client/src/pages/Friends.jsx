import React from 'react'
import { useAppContext } from '../context/AppContext'
import FriendsCard from '../components/FriendsCard'

const Friends = () => {
    const { user, friends } = useAppContext()
    return (
        <>
        <div className='mt-20 text-center text-primary font-medium text-2xl'>Friends</div>
         <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='mt-8'>
                <div className='flex justify-center'>
                    <ul>
                        {user ? (
                            friends && friends.length > 0 ? (
                                friends.map((friend) => (
                                    <li key={friend._id}>
                                        {user._id != friend._id ? (<FriendsCard friend={friend} />) : null}
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
        </>
    )

}

export default Friends