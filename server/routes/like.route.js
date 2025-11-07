import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import { toggleLike } from '../controllers/like.controller.js'

let likeRouter = express.Router()

likeRouter.put('/toggle', isUserAuth, toggleLike)

export default likeRouter