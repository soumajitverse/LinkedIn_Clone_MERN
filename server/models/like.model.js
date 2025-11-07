import mongoose from "mongoose";

const likeSechma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // take refrence from User model
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post' // take refrence from Post model
    }
},
    { timestamps: true }
)

const Like = mongoose.models.Post || mongoose.model('Like', likeSechma);

export default Like;