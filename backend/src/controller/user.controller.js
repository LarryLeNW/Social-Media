import { StatusCodes } from "http-status-codes";
import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log("🚀 ~ getUsersForSidebar ~ loggedInUserId:", loggedInUserId);

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    if (req.user) return res.status(StatusCodes.OK).json(req.user);
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ error: "Token not acceptable" });
  } catch (error) {
    console.log("🚀 ~ getUserInfo ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
