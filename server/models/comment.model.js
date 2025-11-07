import mongoose from "mongoose";

const commentSechma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // take refrence from User model
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post' // take refrence from Post model
    },
    text: {
        type: String,
        required: true
    },

},
    { timestamps: true }
)

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSechma);

export default Comment;