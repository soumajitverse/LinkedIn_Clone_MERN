import uploadOnCloudinary from '../config/cloudinary.js'
import Post from '../models/post.model.js';
import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";

// create post : /api/post/create-post
export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required."
            });
        }

        // uploading image to cloudinary
        let image_url
        if (req.file) {
            image_url = await uploadOnCloudinary(req.file.path)
        }

        const newPost = await Post.create({
            user: userId,
            content,
            image_url: image_url || "",
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully!",
            post: newPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            success: true,
            message: "Internal server error"
        });
    }
};

// edit post : /api/post/edit
export const editPost = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
        const id = postId
        const post = await Post.findOne({ $and: [{ _id: { $eq: id } }, { user: { $eq: userId } }] })

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "You can edit your own post only"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, { content },
            { new: true } // returns updated post
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully!",
            post: updatedPost,
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            success: true,
            message: "Internal server error"
        });
    }
};

// delete post : /api/post/delete
export const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Post ID and User ID are required",
      });
    }

    const post = await Post.findOne({
      $and: [{ _id: { $eq: postId } }, { user: { $eq: userId } }],
    });

    if (!post) {
      return res.status(403).json({
        success: false,
        message: "You can delete your own post only",
      });
    }

    await Like.deleteMany({ post: postId });
    await Comment.deleteMany({ post: postId });

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get all post : /api/post/
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name email image_url") // include user info (adjust fields)
            .sort({ createdAt: -1 }); // newest posts first

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully!",
            count: posts.length,
            posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: true,
            message: "Internal server error"
        });
    }
};

// get all posts by a specific user : /api/post/my-post
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.body

        const userPosts = await Post.find({ user: userId })
            .populate("user", "name email image_url")
            .sort({ createdAt: -1 }); // newest first

        // If no posts found
        if (userPosts.length === 0) {
            return res.status(200).json({
                success: false,
                message: "you have not posted yet.",
            });
        }

        // Success
        res.status(200).json({
            success: true,
            message: "User posts fetched successfully!",
            count: userPosts.length,
            posts: userPosts,
        });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
