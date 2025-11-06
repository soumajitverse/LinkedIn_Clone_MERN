import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: '',
    }
},
    { timestamps: true }
)

let User = mongoose.models.User || mongoose.model('User', userSchema)
export default User