// packages import
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';


// You need to configure cookie-parser in server.js with your secret so that signed cookies can be verified when they're received. <=
import cookieParser from "cookie-parser";

// modules import
import connectToMongoDB from "./Database/DB.config.js";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import contactRoute from "./routes/contact.routes.js";


// dont.env configuration
dotenv.config();

// variables
const app = express();
const port = process.env.PORT;


// MIDDLEWARES

//build-in middlewares
app.use(express.urlencoded());
app.use(express.json());

// signedCookie middleware
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET_KEY)); // Secret required for signing

// For cross-origin requests (important!)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // allow cookies to be sent
}));

// root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// for auth
app.use("/api/auth", authRoute);

// for message
app.use("/api/message", messageRoute);

// for all contacts
app.use("/api/contact/", contactRoute ) 



app.listen(port, () => {
  console.log(`server listening on port ${port}`);
  connectToMongoDB();
});
