import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: process.env.MODE_ENV !== "development",
        sameSite: "strict",
    });
        
}

export default generateTokenAndSetCookie;