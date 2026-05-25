//* Express server
// mini CRUD with JWT authentication project
// centralized error handling

// 3rd-party modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// User define modules
import { reqLogger } from "./utils/logger.js";
import { connectionDB } from "./config/db.config.js";
import userRouter from "./models/user/user.route.js";

// initialization
const app = express();

// DB Connection
try {
  connectionDB();
} catch (error) {
  console.error(error);
  process.exit(1); // stop server code
}

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(reqLogger);

//-----------------------------------------------------------------------------------
//* routes

// home, static files
app.get("/", (req, res) => {
  // console.log(req);
  res.status(200).send({ message: "Welcome! to home route." });
});

// user
app.use("/api/user", userRouter); // register routes


//---------------------------------------------------------------------------
//* Central Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode).json(err.message);
});

// port
const port = process.env.PORT || 4000;

// listening
app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});
