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

        console.log("gender" + gender);

        const profilePic =
            "https://avatar.iran.liara.run/public/" +
            (gender === "male" ? "boy" : "girl") +
            `?username=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
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
