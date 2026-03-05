import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log(ENV.PORT);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is up running" });
})
app.get("/books", (req, res) => {
    res.status(200).json({ message: "books api is up running" });
})

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    });
}

app.listen(ENV.PORT, () => {
    console.log(`app is listening to port ${ENV.PORT}`);
})