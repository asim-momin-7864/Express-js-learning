import jwt from "jsonwebtoken";
import User from "../models/user/user.model.js";

export const protectRoute = async(req, res, next) => {
  try {
    // check token exists
    const token = req.signedCookies.jwt;

    // if token not exists
    if (!token) {
      return res.status(401).json({ error: "Token not exists" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // return our actual value pass as payload => userID
    console.log("decoded =>", decoded);

    /*
      decoded => {
    userID: '685eee5af414338f30a89f3b',
    iat: 1751129781,
    exp: 1752425781
    }
*/

    // if decode not exists
    if (!decoded || decoded?.userID == null) {
      return res.status(401).json({ error: " Invalid JWT " });
    }

    // check use exists or not
    const user = await User.findById(decoded.userID).select("-password");
    console.log("user =>",user);

    // if user not exists
    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }

    // assign user object in req
    req.user = user;

    // call next
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
