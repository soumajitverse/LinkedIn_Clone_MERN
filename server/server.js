import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './routes/user.route.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

let port = process.env.PORT || 4000
let app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true
    }
))
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("server is working")
})

app.listen(port, async () => {
    await connectDB()
    console.log(`server is running on http://localhost:${port}/`)
})