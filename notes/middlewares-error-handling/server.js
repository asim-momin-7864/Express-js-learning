const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// -------------- Global Middleware --------------
// Global middleware functions are executed in the order they're defined.
// They can either modify the request/response objects, send a response, or pass control using next().

// First global middleware: logs a simple message.
app.use((req, res, next) => {
    console.log("I am 1st middleware");
    return next(); // Passes control to the next middleware.
});

// Second global middleware: logs another message.
app.use((req, res, next) => {
    console.log("I am 2nd middlewares");
    return next();
});

// Utility middleware: attaches the current time to the request and logs request details.
// This middleware helps in logging useful data for debugging or monitoring.
app.use((req, res, next) => {
    req.time = new Date();
    console.log(req.url, req.method, req.time, req.hostname);
    next(); // Continue to the next middleware or route.
});

// -------------- Route-Specific Middleware --------------
// This middleware only runs for routes that start with "/random".
// It demonstrates how to add middleware for specific paths.
app.use("/random", (req, res, next) => {
    console.log("I am middleware on /random route");
    return next();
});

// -------------- Custom Middleware Function: Token Checker --------------
// This function checks for a valid token in the query string.
// If the token is valid, it passes control to the next middleware or route handler.
// Otherwise, it throws a custom error using our ExpressError class.
let tokenChaker = (req, res, next) => {
    let { token } = req.query;
    if (token === "give_access") {
        next(); // Token valid; proceed to the route.
    } else {
        // Throw a custom error for better error handling.
        throw new ExpressError(401, "ACCESS DENIED !");
    }
};

// Alternative token-checker middleware example commented out (for API routes).
// app.use("/api", (req, res, next) => {
//   let { token } = req.query;
//   if (token === "give_access") {
//     next();
//   } else {
//     res.status(401).send("ACCESS DENIED !");
//   }
// });

// -------------- Routes --------------

// Root route: simple endpoint to verify the server is working.
app.get("/", (req, res) => {
    res.send("root route is working");
});

// Random route: uses the route-specific middleware above.
app.get("/random", (req, res) => {
    res.send("random page");
});

// Protected API route: uses the tokenChaker middleware to secure the endpoint.
// Only requests with a valid token (i.e., token === "give_access") will reach the handler.
app.get("/api", tokenChaker, (req, res) => {
    res.send("High classified file");
});

// -------------- Error Handling Middleware --------------
// This error-handling middleware catches any errors thrown in the app.
// It extracts the status and message from the error and sends an appropriate response.
app.use((err, req, res, next) => {
    console.log("------------ERROR------------");
    let { status, message } = err;
    res.status(status).send(message);
});

// -------------- 404 Middleware --------------
// This middleware is placed at the end so that if no routes match, it sends a 404 response.
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start the server on port 8080.
app.listen(8080, () => {
    console.log("server is running at port 8080");
});
