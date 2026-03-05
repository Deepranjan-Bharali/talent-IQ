import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

console.log(ENV.PORT);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
})

app.listen(ENV.PORT, () => {
    console.log(`app is listening to port ${ENV.PORT}`);
})