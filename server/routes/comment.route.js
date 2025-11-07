import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import { createComment, deleteComment, editComment, getAllComments } from '../controllers/comment.controller.js'

let commentRouter = express.Router()

commentRouter.post('/add', isUserAuth, createComment)
commentRouter.post('/specific-post', isUserAuth, getAllComments)
commentRouter.put('/edit', isUserAuth, editComment)
commentRouter.delete('/delete', isUserAuth, deleteComment)

export default commentRouter