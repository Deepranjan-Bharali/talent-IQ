import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express";


const app = express();
const __dirname = path.resolve();

Middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
// app.use(express.urlencoded({ extended: true }));

app.use("/api/inngest",serve({client:inngest,functions}))
// Routes
app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is up running" });
});

app.get("/books", (req, res) => {
    res.status(200).json({ message: "books api is up running" });
});

// Serve static files and SPA in production
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


const PORT = ENV.PORT || 3000;

const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        });
    }catch(error){
        console.error("Error starting server",error);
    }
};

startServer();