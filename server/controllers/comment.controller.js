import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

// create comment : /api/comment/add
export const createComment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;

        if (!postId || !userId || !text) {
            return res.status(400).json({
                success: false,
                message: "Post ID, User ID, and text are required",
            });
        }

        // create the comment
        const comment = await Comment.create({
            user: userId,
            post: postId,
            text,
        });

        // increase comment count in Post
        await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// get comments for a specific post : /api/comment/specific-post
export const getAllComments = async (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        // find all comments for this post
        const comments = await Comment.find({ post: postId })
            .populate("user", "name email profileImage") // include user details
            .sort({ createdAt: -1 }); // newest first

        res.status(200).json({
            success: true,
            totalComments: comments.length,
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// edit comment : /api/comment/edit
export const editComment = async (req, res) => {
    try {
        const { userId, text, commentId } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required to update comment",
            });
        }

        // check if comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // ensure only the author can edit
        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own comment",
            });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        console.error("Error editing comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// delete comment : /api/comment/delete
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // ensure only the author can delete
        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own comment",
            });
        }

        await Comment.findByIdAndDelete(commentId);

        // decrease comment count in Post
        await Post.findByIdAndUpdate(comment.post, { $inc: { comments: -1 } });

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
