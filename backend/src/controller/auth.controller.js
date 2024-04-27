import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    try {
        const { username, fullName, password, confirmPassword, gender } =
            req.body;

        if (password != confirmPassword) {
            return res
                .status(StatusCodes.NOT_ACCEPTABLE)
                .json("Password don't match !");
        }
        const user = await User.findOne({ username });

        if (user) {
            return res
                .status(StatusCodes.NOT_IMPLEMENTED)
                .json({ error: "Username already exists" });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            // generateTokenAndSetCookie(newUser._id, res);
            try {
                await newUser.save();
                return res.status(StatusCodes.CREATED).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                });
            } catch (error) {
                return res.status(StatusCodes.NOT_IMPLEMENTED).json({ error });
            }
        } else {
            res.status(StatusCodes.NOT_ACCEPTABLE).json({
                error: "Invalid user data",
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
};
