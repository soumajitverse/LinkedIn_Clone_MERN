import mongoose from "mongoose";

const postSechma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // take refrence from User model
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

const Post = mongoose.models.Post || mongoose.model('Post', postSechma);

export default Post;