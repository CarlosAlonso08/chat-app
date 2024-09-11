import jwt from  "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg: "Please login to access this route"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({msg: "Invalid token"});
        }

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

        next();

    } catch (error) {
        console.log("Erro in protectRoute ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute;