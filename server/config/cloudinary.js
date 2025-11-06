import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (imagePath) => {

    try {

        // Upload the image
        if (!imagePath) {
            return null
        }
        const result = await cloudinary.uploader.upload(imagePath);
        console.log(result);

        fs.unlinkSync(imagePath) // for deleting image

        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(imagePath) // for deleting image
        console.error(error);
    }
}

export default uploadOnCloudinary