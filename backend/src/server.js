import express from "express";
import dotenv from "dotenv";
dotenv.config();
import APIv1 from "./routers/index.js";
import connectToMongoDB from "./config/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
const PORT = 8888;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res, next) => {
    res.send("<h1>Hello API App Chat LarryLe</h1>");
});

app.use("/v1", APIv1);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
