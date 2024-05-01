import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, fullName, password, confirmPassword, gender } = req.body;

    if (password != confirmPassword) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ error: "Password don't match !" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ error: "Username already exists" });
    }

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
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);

      try {
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
    console.log("🚀 ~ signup ~ error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
