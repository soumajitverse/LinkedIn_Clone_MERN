import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'

const PostCard = ({ post }) => {

  // Converts updatedAt to "2d ago", "5h ago", etc.
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    if (seconds < 60) return "Just now";

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return `${count}${unit[0]} ago`; // e.g. "3d ago", "5h ago"
      }
    }
  }

  // --- Read More / Read Less logic ---
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 120; // max characters before truncation

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine which text to show
  const contentToShow = isExpanded
    ? post.content
    : post.content.length > MAX_LENGTH
      ? post.content.slice(0, MAX_LENGTH) + '...'
      : post.content;

  const {
    user,
    axios,
    fetchPosts,
    fetchMyPosts
  } = useAppContext()

  return (
    <div className='border rounded-lg w-80 sm:w-150 mb-3 p-3 flex flex-col shadow-sm bg-white'>

      {/* Profile image + Username + Time */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          {
            post.user.profileImage
              ? <img className='w-6 h-6 rounded-full' src={post.user.profileImage} alt='' />
              : <img className='w-6 h-6 rounded-full' src={assets.profile_icon} alt='' />
          }
          <p className='font-medium ml-2'>{post.user.name}
            {user._id == post.user._id && (<span className='font-light'> (me)</span>)}

          </p>
        </div>
        <p className='text-sm text-gray-500'>{timeAgo(post.updatedAt)}</p>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <img
          className='mt-3 w-auto h-auto max-w-150 max-h-100 rounded-lg object-cover'
          src={post.image_url}
          alt='Post'
        />
      )}

      {/* Post Content */}
      <div className='mt-3 text-sm text-gray-800 mb-2'>
        {contentToShow}
        {post.content.length > MAX_LENGTH && (
          <button
            onClick={toggleReadMore}
            className='text-blue-600 ml-1 font-medium hover:underline'
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className='flex flex-row justify-between px-2' >
        <div>like <span className='font-light text-sm'>{post.likes}</span></div>
        {user._id == post.user._id && (<div className='cursor-pointer text-blue-500 font-medium'
        onClick={
          () => {
            
  
        }}
        >Edit</div>)}
        {user._id == post.user._id && (<div className='cursor-pointer text-red-600 font-medium'
          onClick={async () => {
            try {
              console.log(post._id)
              const { data } = await axios.delete('/api/post/delete', {
                data: { postId: post._id }
              })
              if (data.success) {
                toast.success(data.message)
                fetchPosts()
                fetchMyPosts()
              }
            } catch (error) {
              console.log(error)
              toast.error('Failed to delete post!')
            }
          }}
        >Delete</div>)}
        <div>comment <span className='font-light text-sm'>{post.comments}</span></div>
      </div>

    </div>
  )
}

export default PostCard
