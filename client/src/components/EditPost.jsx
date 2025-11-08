import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";

const EditPost = ({ post, onClose, onUpdated }) => {
  const { axios } = useAppContext();

  const [content, setContent] = useState(post.content);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Content cannot be empty.");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("postId", post._id);
      formData.append("content", content);
      if (file) formData.append("image_url", file);

      const { data } = await axios.put("/api/post/edit", formData);

      if (data.success) {
        toast.success("Post updated successfully!");
        onUpdated(data.post);
        onClose();
      } else {
        toast.error(data.message || "Failed to update post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 w-80 sm:w-[352px] bg-white rounded-lg shadow-xl border"
      >
        <h2 className="text-2xl font-medium text-center">
          <span className="text-primary">Edit</span> Post
        </h2>

        {/* Current image preview */}
        {post.image_url && !file && (
          <img
            src={post.image_url}
            alt="Current post"
            className="w-full rounded-lg object-cover"
          />
        )}

        {/* New image input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded p-2 w-full"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit your post..."
          className="border rounded p-2 w-full"
          rows="3"
        />

        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dull disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
