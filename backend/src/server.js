import express from "express";
import dotenv from "dotenv";
dotenv.config();
import APIv1 from "./routers/index.js";
import connectToMongoDB from "./config/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import corsOptions from "./config/cors.js";
const PORT = 8888;

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.get("/", (req, res, next) => {
  res.send("<h1>Hello API App Chat LarryLe</h1>");
});

app.use("/v1", APIv1);

connectToMongoDB()
  .then(() => console.log("connect to mongodb successfully..."))
  .then(() =>
    server.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
