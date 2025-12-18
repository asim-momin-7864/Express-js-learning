import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  meController,
} from "../controllers/auth/auth.controllers.js";

import { protectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();

//signup
// ROUTE 1 => Create a User using : POST "/api/auth/signup". Does not require login
router.post("/signup", signupController);

//login
// ROUTE 2 => Login a User using : POST "/api/auth/login". Does not require login
router.post("/login", loginController);

//logout
// ROUTE 3 => Logout a User using : GET "/api/auth/logout". Required login
router.get("/logout", logoutController);

//me
//ROUTE 4 => GET fetch current user data : GET "/api/me" . Login Required
router.get("/me", protectRoute, meController);

export default router;
