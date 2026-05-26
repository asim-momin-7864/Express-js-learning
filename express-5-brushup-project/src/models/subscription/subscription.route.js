//* Subscription Router

// 3rd party modules
import express from "express";

// user defined module
import { getAllSubsController, newSubController } from "./subscription.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.middleware.js";

const router = express.Router();

// GET: all my subscriptions
router.get("/mysubscriptions", protectRoute ,getAllSubsController )

// POST: create new subscription
router.post("/new", protectRoute ,newSubController)

export default router;