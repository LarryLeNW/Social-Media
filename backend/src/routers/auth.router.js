import express from "express";
const Router = express.Router();
import * as AuthController from "../controller/auth.controller.js";

Router.route("/").get((req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Auth router APIs v1 get...",
    });
});

Router.route("/signup").post(AuthController.signup);
Router.route("/login").post(AuthController.login);
Router.route("/logout").post(AuthController.logout);

Router.route("/getInfo").post((req, res) => {
    console.log(req.body);
});

export default Router;
