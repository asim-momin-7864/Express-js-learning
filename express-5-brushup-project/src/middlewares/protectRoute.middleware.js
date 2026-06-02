//* Protect Route Middleware

// 3rd party modules
import jwt from "jsonwebtoken";
import { getLogger } from "pino-correlation-id";

// user defined modules
import User from "../models/user/user.model.js";

export const protectRoute = async (req, res, next) => {

  const logger = getLogger();

  try {
    let token;

    //TEST
    // console.log("req.cookies: ", req.cookies);

    // check req cookies have or not --- is even authentic ?
    if (req.cookies && req.cookies.jwt_token) {
      token = req.cookies.jwt_token;
    }

    // token exists ?
    if (!token) {
      const err = new Error("Your are not logged in. Please log in!! ");

      err.statusCode = 401;

      next(err);
      return;
    }

    // verify & decode JWT
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    // console.log("decoded: ", decoded);
    

    // find jwt user ID exists in DB ?
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      const err = new Error(
        " The user beloning to this tokwn no longer exists ",
      );
      err.statusCode = 401;
      next(err);
      return;
    }

    // attached user object to "request stream"
    req.user = currentUser;

    next();
  } catch (err) {

    // err.statusCode = 500;  //! do not hard code status code here, it confused global handler
    
    /*

    If a user sends an expired or tampered token, jwt.verify() will throw an error and trigger this catch block. 
    If you hardcode err.statusCode = 500, your global error handler will treat an expired session as a critical system crash! 
    It will log a massive red error in Better Stack, potentially triggering emergency SMS alerts to your phone, 
    all because a user's session simply timed out.

    */

    // 3. SECURITY LOGGING & JWT BUG FIX
    // Check if the error was specifically caused by a bad token

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      
      err.statusCode = 401;
      err.message = "Invalid or expired token. Please log in again.";
      
      // 🚨 LOCAL SECURITY LOG: We log this locally as a warning because 
      // high volumes of bad JWTs indicate someone is trying to hack the server.
      
      logger.warn({ errorType: err.name }, "Security Alert: Request rejected due to invalid/expired JWT");
      
    } else {
      // If it is NOT a JWT error, it is a real database/code crash.
      err.statusCode = 500;
      // No local log needed here, the global handler will print the 500 stack trace.
    }

    next(err);
  }
};
