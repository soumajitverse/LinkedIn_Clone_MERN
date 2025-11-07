import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import uploadOnCloudinary from '../config/cloudinary.js'

// user signup : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // to check all the details are given or not
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Give all the details"
      })
    }

    // uploading image to cloudinary
    let profileImage
    // req.file is for single image
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path)
    }

    // checking user is already present or not
    let existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist"
      })
    }

    const hashedPasword = await bcrypt.hash(password, 10) // hashing the password and 10 is Salt rounds 

    // user creation
    const user = await User.create({
      name,
      email,
      password: hashedPasword,
      profileImage: profileImage || ""
    })

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        name,
        email,
        profileImage
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

// user login : /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // checking user is already present or not
    let existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials."
      })
    }

    // checking the user given password (while login) and the hashed password is same or not
    let match = await bcrypt.compare(password, existUser.password)

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }

    // jwt token created and stored the value into token
    let token
    try {
      token = generateToken(existUser._id)
    } catch (error) {
      console.log(error)
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // validity 7 days
    })

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        name: existUser.name,
        email: existUser.email,
        profileImage: existUser.profileImage
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }

}

// user logout : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token") // clearing the cookie will delete the token so that user will be automatically logout
    res.status(200).json({ message: "Logout successfully" })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }

}

// Check Auth : api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body

    // Find the user in the database by their ID
    // `.select("-password")` excludes the password field from the response for security
    const user = await User.findById(userId).select("-password")

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

// edit profile : /api/user/edit
export const modify = async (req, res) => {
  try {
    const { userId, name, bio, profileImage } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};