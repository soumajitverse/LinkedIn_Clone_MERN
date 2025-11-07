import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

// toggle like/unlike : /api/like/toggle
export const toggleLike = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        if (!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Post ID and User ID are required",
            });
        }

        // check if like already exists 
        const existingLike = await Like.findOne({
            $and: [{ post: { $eq: postId } }, { user: { $eq: userId } }],
        });

        let action = "";
        let updatedPost;

        if (existingLike) {
            // unlike: remove like record & decrement count
            await Like.findOneAndDelete({
                $and: [{ post: { $eq: postId } }, { user: { $eq: userId } }],
            });

            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: -1 } },
                { new: true }
            );

            action = "unliked";
        } else {
            // like: create like record & increment count
            await Like.create({ user: userId, post: postId });
            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 } },
                { new: true }
            );
            action = "liked";
        }

        res.status(200).json({
            success: true,
            message: `Post ${action} successfully`,
            post: updatedPost,
            liked: action === "liked",
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
