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
Router.route("/logout").get(AuthController.logout);

export default Router;
