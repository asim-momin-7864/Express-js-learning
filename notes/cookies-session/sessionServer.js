// Import necessary modules
const express = require("express");
const app = express();
const session = require("express-session"); // For session management
const ejs = require("ejs"); // For rendering EJS templates
const path = require("path"); // For handling file paths
var flash = require("connect-flash"); // For handling flash messages

// Set EJS as the view engine and define the 'views' folder path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));

// ---------------- SESSION & FLASH SETUP ----------------
// Initialize session middleware
app.use(
    session({
        secret: "mySuperSecretString", // Used to sign the session ID cookie
        resave: false, // Prevents session from being saved on every request
        saveUninitialized: true, // Ensures uninitialized sessions are saved
    })
);

// Initialize flash middleware (must be added after session)
app.use(flash());

// ---------------- TEST ROUTE ----------------
app.get("/test", (req, res) => {
    res.send("This is a random route to test session functionality");
});

// ---------------- SESSION COUNTER ACTIVITY ----------------
app.get("/sessionCount", (req, res) => {
    // Check if `count` property exists in session
    if (req.session.count) {
        req.session.count++; // Increment the counter if it exists
    } else {
        req.session.count = 1; // Initialize the counter if it doesn't exist
    }
    res.send(`You have sent a request to the server ${req.session.count} times.`);
});

// ---------------- FLASH MESSAGES SETUP ----------------
// Middleware to pass flash messages to EJS templates via `res.locals`
// This makes the messages available across all routes without passing them explicitly
app.use((req, res, next) => {
    res.locals.success = req.flash("successful"); // Success messages - storing flash message key in locals so that it can use to show flash message
    res.locals.error = req.flash("error"); // Error messages
    next();
});

// ---------------- FLASH MESSAGE EXAMPLE ----------------
// Register route that sets flash messages and stores data in the session
app.get("/register", (req, res) => {
    let { name = "anyonamus" } = req.query; // Extract 'name' from query parameters
    req.session.name = name; // Store 'name' in the session object

    // Flash message setup
    if (name == "anyonamus") {
        req.flash("error", "User is not registered"); // Error flash message
    } else {
        req.flash("successful", "New user is registered successfully"); // Success flash message - generating flash message with key to send in frontend to in it's respective key
    }

    res.redirect("/hello"); // Redirect to '/hello' route
});

// ---------------- DISPLAY FLASH MESSAGES ----------------
// Route to display the session data and flash messages
app.get("/hello", (req, res) => {
    console.log("Session Object :- ", req.session); // Logs the session object in the console
    let name = req.session.name; // Access 'name' from session object
    res.render("hello.ejs", { name }); // Pass 'name' to the EJS template
});

// ---------------- SERVER SETUP ----------------
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
