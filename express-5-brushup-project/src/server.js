//* Express server
// mini CRUD with JWT authentication project
// centralized error handling

// 3rd-party modules
import express from "express";

// Global middlewares
app.use(express.json());


// initialization
const app = express();

// routes

//home, static files
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome! to home route." });
});

// port
const port = process.env.PORT || 4000;

// listening
app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});
