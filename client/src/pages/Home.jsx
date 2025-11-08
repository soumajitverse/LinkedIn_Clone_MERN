import React from 'react'
import PostCard from '../components/PostCard'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const {user} =useAppContext()
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='mt-10'>
        <div className='flex justify-center min-h-screen'>
          {/* No post available. */}
         {user? <PostCard /> :null}
        </div>
      </div>
    </div>
  )
}

export default Home