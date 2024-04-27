import express from "express";
const Router = express.Router();
import * as AuthController from "../controller/auth.controller.js";

Router.route("/").get((req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Auth router APIs v1 get...",
    });
});

Router.route("/signup").post(AuthController.signup);
Router.route("/login").post((req, res) => {
    console.log(req.body);
});

Router.route("/register").post((req, res) => {
    console.log(req.body);
});
Router.route("/getInfo").post((req, res) => {
    console.log(req.body);
});

export default Router;
