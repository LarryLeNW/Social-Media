import express from "express";
import dotenv from "dotenv";
dotenv.config();
import APIv1 from "./routers/index.js";
import connectToMongoDB from "./config/connectToMongoDB.js";

const startServer = () => {
    const app = express();
    app.use(express.json());

    app.get("/", (req, res, next) => {
        res.send("<h1>Hello API App Chat LarryLe</h1>");
    });

    app.use("/v1", APIv1);

    app.listen(process.env.PORT || 5000, (err) => {
        console.log(`server running at port ${process.env.PORT || 5000}...`);
    });
};

connectToMongoDB()
    .then(() => console.log("connect to mongodb successfully..."))
    .then(startServer)
    .catch((err) => console.log(err));
