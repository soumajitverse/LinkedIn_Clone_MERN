import express from 'express'
import isUserAuth from '../middlewares/user.auth.js'
import {isAuth, login, logout, register } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'

let userRouter = express.Router()

userRouter.post('/register', register, upload.single("profileImage"))
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/is-auth', isUserAuth, isAuth)

export default userRouter