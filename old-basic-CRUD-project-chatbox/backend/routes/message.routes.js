// packages import
import express from "express";

// modules import
import {
  sendMessageController,
  getMessagesController,
} from "../controllers/message/message.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

// varibales
const router = express.Router();

// ROUTE 1 => Create a Message using : POST "/api/message/send/:id". Login Required
router.post("/send/:id", protectRoute, sendMessageController);

// ROUTE 2 => Get Messages using GET "/api/messages/:id" . login Required
router.get("/:id", protectRoute, getMessagesController);

export default router;
