import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import { upload } from '../middlewares/multer.js'
import { createPost, deletePost, editPost, getAllPosts, getUserPosts } from '../controllers/post.controller.js'

let postRouter = express.Router()

postRouter.post('/create-post', isUserAuth, createPost, upload.single("image_url"))
postRouter.put('/edit', isUserAuth, editPost)
postRouter.post('/delete', isUserAuth, deletePost)
postRouter.get('/', isUserAuth, getAllPosts)
postRouter.get('/my-post', isUserAuth, getUserPosts)

export default postRouter