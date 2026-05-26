//* Protect Route Middleware

// 3rd party modules
import jwt from "jsonwebtoken";

// user defined modules
import User from "../models/user/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    //TEST
    console.log("req.cookies: ", req.cookies);

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
    err.statusCode = 500;
    next(err);
  }
};
