import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'

const PostAdd = () => {
  const { showPostAdd, setShowPostAdd, fetchPosts, axios } = useAppContext()

  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return toast.error('Write something before posting')

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('content', content)
      if (file) formData.append('image_url', file)

      const { data } = await axios.post('/api/post/create-post', formData)

      if (data.success) {
        toast.success('Post created!')
        fetchPosts()
        setShowPostAdd(false)
        setContent('')
        setFile(null)
      } else toast.error(data.message || 'Failed to create post')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!showPostAdd) return null

  return (
    <div
      onClick={() => setShowPostAdd(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 w-80 sm:w-[352px] bg-white rounded-lg shadow-xl border"
      >
        <h2 className="text-2xl font-medium text-center">
          <span className="text-primary">Add</span> Post
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded p-2 w-full"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="border rounded p-2 w-full"
          rows="3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dull text-white py-2 rounded-md disabled:opacity-60"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default PostAdd
