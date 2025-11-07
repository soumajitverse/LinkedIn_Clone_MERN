import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import { createComment, deleteComment, editComment, getAllComments } from '../controllers/comment.controller.js'

let commentRouter = express.Router()

commentRouter.post('/add', isUserAuth, createComment)
commentRouter.get('/specific-post', isUserAuth, getAllComments)
commentRouter.put('/edit', isUserAuth, editComment)
commentRouter.put('/delete', isUserAuth, deleteComment)

export default commentRouter