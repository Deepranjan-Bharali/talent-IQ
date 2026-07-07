import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { askAiChat } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", protectRoute, askAiChat);

export default router;
