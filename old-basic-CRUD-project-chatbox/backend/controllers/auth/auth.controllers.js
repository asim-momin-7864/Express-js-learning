// packages import
import bcrypt from "bcryptjs";

// modules import
import User from "../../models/user/user.model.js";
import generateJwtAndSetCookie from "../../utils/generateJwtAndSetCookie.js";

//signup
export const signupController = async (req, res) => {
  try {
    console.log("signupController");

    // take data
    const { fullName, username, gender, password, confirmPassword } = req.body;

    // if password donest match
    if (!password === confirmPassword) {
      return res.status(400).json({
        error: "Password don't match",
      });
    }

    // is user exist
    const existedUser = await User.findOne({ username: username });

    if (existedUser) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // profile picture
    const profileUrl = `https://avatar.iran.liara.run/public/${gender}?username=${username}`;

    // new user
    let newUser = {
      fullName,
      username,
      password: hash,
      profileUrl: profileUrl,
      gender,
    };

    if (newUser) {
      /*
      ? Why passing res in generateJwtAndCookie(..., ...)

      res.cookie("jwt", token, { ... });
      This sets a cookie in the user's browser (or Postman), and you can only do that with the res object from Express.
      
      So when you pass res to your utility function:
      
      await generateJwtAndSetCookie(newUser._id, res);
      You're allowing the function to attach the JWT to a secure cookie in the response.

      */

      // add to DB
      const user = await User.create(newUser);

      //generate JWT and set cookie
      generateJwtAndSetCookie(user?._id, res);

      res.status(201).json({
        _id: newUser._id,
        ...newUser,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error in signup controller", err); // this is for us developers to understand what error coming
    res.status(500).json({
      error: "Internal Server Error", // this is for users to show someting internally happed
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    // Form validation

    // extract input
    const { username, password } = req.body;

    // check user exists or not
    const user = await User.findOne({ username });

    // check password match or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // return => boolean, if password not exists we assign blank string

    // check credentials and return error
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // if credentials are correct the generate jwt and set cookie
    generateJwtAndSetCookie(user?._id, res);

    console.log("Reach to login controller");

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profileUrl: user.profileUrl,
    });
  } catch (err) {
    console.log("Error in login controller", err); // this is for us developers to understand what error coming
    res.status(500).json({
      error: "Internal Server Error", // this is for users to show someting internally happed
    });
  }
};

//logout
export const logoutController = (req, res) => {
  try {
     res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Lax", // match what you used when setting it
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.log("Error at logout controller", err); // this is for us developers to understand what error coming
    res.status(500).json({ error: "Internal Server Error" }); // this is for users to show someting internally happed
  }
};


// me
export const meController = async (req, res) => {
 try {
    console.log("Hi i am in meController")
    // console.log("me controller req =>", req);
    res.json(req.user);

 } catch (error) {
    console.log("Error at meController", error.message);
    res.status(500).json({error: "Internal Server Error"});
 }
} 
