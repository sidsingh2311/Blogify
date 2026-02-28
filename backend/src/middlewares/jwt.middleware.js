import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
// method to verify jwt token
const verifyJWT = async (req , res, next) => {
    try{
         
        const token = req.header("Authorization")?.replace("Bearer ","")

        // check if token is empty
        if(!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized access",
                data: {}
            })
        } 

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user =await User.findById(decodedToken?._id).select("-password")

        // check if user is empty
        if(!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthrized access",
                data: {}
            })
        } 

        req.user = user
        return next();
    }
    catch(error) {
             return res.status(401).json({
                status: false,
                message: error.message,
                data: {}
            })
    }
} 

export {verifyJWT};