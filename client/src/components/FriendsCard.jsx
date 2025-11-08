import React from 'react'
import { assets } from '../assets/assets'

const FriendsCard = ({ friend }) => {
    return (
        <div className='border rounded-lg w-60 sm:w-100 mb-3 p-3 flex flex-row shadow-sm bg-white gap-5'>
            {
                friend.profileImage ? <img className='w-15 h-15 rounded-[100px]' src={friend.profileImage} alt="" /> : <img className='w-15 h-15' src={assets.profile_icon} alt="" />
            }

            <div className='flex flex-col'>
                <div className='font-medium'>{friend.name}</div>
                <div className='text-sm'>{friend.bio}</div>
            </div>

        </div>
    )
}

export default FriendsCard