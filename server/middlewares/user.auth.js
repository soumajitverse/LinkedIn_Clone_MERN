import jwt from 'jsonwebtoken'

const isUserAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Login Again"
            })
        }

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecoded.id) {
            req.body = { ...req.body, userId: tokenDecoded.id }
            console.log(req.body.userId)
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Login Again"
            })
        }
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default isUserAuth