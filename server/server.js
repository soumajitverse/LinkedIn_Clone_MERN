import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './routes/user.route.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import postRouter from './routes/post.route.js'
import likeRouter from './routes/like.route.js'
import commentRouter from './routes/comment.route.js'

let port = process.env.PORT || 4000
let app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: "https://linked-in-clone-mern.vercel.app",
        credentials: true
    }
))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/like', likeRouter)
app.use('/api/comment', commentRouter)

app.get('/', (req, res) => {
    res.send("server is working")
})

app.listen(port, async () => {
    await connectDB()
    console.log(`server is running on http://localhost:${port}/`)
})