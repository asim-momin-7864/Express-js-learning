//* user router

// 3rd party modules
import express from "express";
const router = express.Router();

// user define modules
import { signupController, loginController } from "./user.controller.js";

// signup
router.post("/signup", signupController);

// login
router.post("/login", loginController);

export default router;
