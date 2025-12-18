// packages import
import express from "express";

// modules import
import { allContactsController } from "../controllers/contact/contact.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

// variables
const router = express.Router();

// ROUTE 1 => Get all contacts data : GET "/api/contact/all". Login Required
router.get("/all", protectRoute, allContactsController);

export default router;
