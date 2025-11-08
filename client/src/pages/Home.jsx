import React from 'react'
import PostCard from '../components/PostCard'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const { user, posts } = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='mt-30'>
        <div className='flex justify-center'>
          <ul>
            {user ? (
              posts && posts.length > 0 ? (
                posts.map((post) => (
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

export default Home
