import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserInfo,
  getUsersForSidebar,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/info", protectRoute, getUserInfo);

export default router;
