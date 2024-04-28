import express from "express";
const Router = express.Router();
import AuthRouter from "./auth.router.js";
import UserRouter from "./user.routes.js";
import MessageRouter from "./message.routes.js";
import { StatusCodes } from "http-status-codes";

Router.get("/status", (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "APIs v1 are ready to use...",
    });
});

Router.use("/auth", AuthRouter);
Router.use("/users", UserRouter);
Router.use("/messages", MessageRouter);

export default Router;
