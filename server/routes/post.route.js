import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import { upload } from '../middlewares/multer.js'
import { createPost, deletePost, editPost, getAllPosts, getUserPosts } from '../controllers/post.controller.js'

let postRouter = express.Router()

postRouter.post(
    '/create-post',
    upload.single("image_url"),
    isUserAuth,
    createPost
)

postRouter.put("/edit", isUserAuth, upload.single("image_url"), editPost);

postRouter.delete('/delete', isUserAuth, deletePost)
postRouter.get('/', isUserAuth, getAllPosts)
postRouter.get('/my-post', isUserAuth, getUserPosts)

export default postRouter