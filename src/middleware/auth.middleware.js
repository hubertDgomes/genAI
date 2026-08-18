import jwt from 'jsonwebtoken'

const authUser = async (req , res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message : "Token not provided"
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_TOKEN)   
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }
}

export default authUser