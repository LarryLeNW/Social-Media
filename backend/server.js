import express from "express";
import dotenv from "dotenv";
dotenv.config();
import APIv1 from "./routers/index.js";
const app = express();

app.get("/", (req, res, next) => {
    res.send("<h1>Hello API App Chat LarryLe</h1>");
});

app.use("/v1", APIv1);

app.listen(process.env.PORT || 5000, (err) => {
    if (!err)
        console.log(`server running at port ${process.env.PORT || 5000}...`);
});
