//* Subscription Router

// 3rd party modules
import express from "express";

// user defined module
import {
  getAllSubsController,
  newSubController,
  updateSubController,
  deleteSubController
} from "./subscription.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.middleware.js";

const router = express.Router();

// GET: all my subscriptions
router.get("/mysubscriptions", protectRoute, getAllSubsController);

// POST: create new subscription
router.post("/new", protectRoute, newSubController);

// PATCH: update subscription
router.patch("/update/:id", protectRoute, updateSubController);

// DELETE: delete subscription
router.delete("/delete/:id", protectRoute, deleteSubController);

export default router;
