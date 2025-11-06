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
        required: false
    }
}, { timestamps: true })

let User = mongoose.models.User || mongoose.model('User', userSchema)
export default User