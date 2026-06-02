//* User controllers

// 3rd party modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getLogger } from "pino-correlation-id";

// custom module
import User from "./user.model.js";
import { generateToken } from "../../utils/generateToken.js";

// signup controller
export const signupController = async (req, res, next) => {
  const logger = getLogger();

  // user details
  const { username, email, password } = req.body;

  //log
  logger.info({ email, username }, "User registration process initiated");

  //TODO request validation - zod / manually
  // manually

  if (!username || !email || !password) {
    let err = new Error("All fields are required!");
    err.statusCode = 400;

    //log
    logger.warn({ email }, "Invalid credentials");

    next(err); // passing error to error handler
    return;
  }

  //TODO check if user exists or not -> return login

  /*
  * NEW solution comes with in express 5
  !  - if async handler / controller code breaks , before it will crash the server and not have to catch it 
  - and we have to make some jugad like "asyncWrapper" , try catch 

  * - but now now neede, our centralized error hadler can handle

  */

  // good practice - to write breakable code into try-catch and send error explicitly to global error handerl
  try {
    // password hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // create new
    const result = await User.create({
      username,
      email,
      password: hash,
    });

    // console.log("result: ", result);

    // user is authentc -- so generate token for it
    const token = generateToken(result._id);
    // console.log(token);

    //token pass through cookies
    // Send the cookie securely
    res.cookie("jwt_token", token, {
      httpOnly: true, // Immune to JavaScript theft (XSS protection)
      secure: process.env.NODE_ENV === "production", // false on localhost
      sameSite: "strict", // CSRF Protection
      maxAge: 60 * 60 * 1000, // Expires in 1 hour
    });

    //Send user object with res
    req.user = {
      id: result._id,
      username: result.username,
      email: result.email,
    };

    //log
    logger.info({ email: result.email }, "User account successfully created");

    // response
    res.status(201).json({
      status: "success",
      message: `${result.username} signup!`,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

// login controller
export const loginController = async (req, res, next) => {
  const logger = getLogger();

  //* Steps for login, authentication flow
  //[1] first take data comes with request
  //[2] zod - validate that data first, means that data follows our schema-stucture we actully store in DB (if not means it is fake data or random no need to even check)
  //[3] check exits in DB? by username or email
  //[4] verfiy entered password and our password is correct or not ? - is actule owner/user

  //* [5] after login or signup we use JWT as give token this user is valid can us our app/apis - * not in for login and signup/ authentication
  //? [6] how tp protect all routes?
  // protectRoutes like middleware , check every request have token and is it valid (jwt.verify)  then pass reqtest to that api

  const { email, password } = req.body;

  //log
  logger.info({ email }, "User login attempt received");

  //TODO validation

  // find
  const user = await User.findOne({ email });

  // not exists
  if (!user) {
    const error = new Error("Invalid Credentials!");
    error.statusCode = 400; // bad request

    //log
    logger.warn(
      { email },
      "Failed login attempt: Invalid authentication credentials",
    );

    next(error);
    return;
  }

  // check password
  const isMatched = bcrypt.compareSync(password, user.password);

  if (!isMatched) {
    const error = new Error("Invalid Credentials!");
    error.statusCode = 400; // bad request

    //log
    logger.warn(
      { email },
      "Failed login attempt: Invalid authentication credentials",
    );

    next(error);
    return;
  }

  // user is authentic - so generate token for it
  const token = generateToken(user._id);

  //token pass through cookies
  // Send the cookie securely
  res.cookie("jwt_token", token, {
    httpOnly: true, // Immune to JavaScript theft (XSS protection)
    secure: process.env.NODE_ENV === "production", // false on localhost
    sameSite: "strict", // CSRF Protection
    maxAge: 60 * 60 * 1000, // Expires in 1 hour
  });

  // send user object with res
  res.user = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  //log
  logger.info(
    { userId: user._id, email: user.email },
    "User session successfully authenticated",
  );

  res.status(200).json({
    status: "success",
    message: `${user.username} loggedin!`,
  });
};
