import User from "../models/user.model.js";
import bicrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match"});
        }

        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"Username already exists"});
        }
        
        // HASH PASS
        const salt = await bicrypt.genSalt(10);
        const hashedPassword = await bicrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({error:"Invalid data"});
        }

    } catch (error) {
        console.log("Error with the sign up controller", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export const login = async (req, res) => {
    try {
        const  {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bicrypt.compare(password, user?.password || "")
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }
        
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });
        

    } catch (error) {
        console.log("Error with the login controller", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error with the logout controller", error);
        res.status(500).json({error: "Internal server error"});
    }
}
