const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// ============================= ERROR HANDLING =========================================

// Route to intentionally generate an error.
// In this route, a reference error is triggered (undefined variable),
// which will be caught by the error handling middleware.
app.get("/err", (req, res) => {
    // This will cause a ReferenceError because "abds" is not defined.
    abcd = abds;
});

// --------------------- Custom Error Handling Middleware ---------------------

// First error-handling middleware.
// Its purpose is to catch errors from earlier middleware/routes and pass them along.
// By calling next(err), it forwards the error to the next error-handling middleware.
app.use((err, req, res, next) => {
    console.log("-------------------ERROR 1 ------------------");
    // Pass the error to the next error-handling middleware.
    next(err);
});
  
// Second error-handling middleware.
// This middleware formats the error response for the client.
// It uses destructuring to extract status and message from the error, with defaults if not provided.
app.use((err, req, res, next) => {
    console.log("------------ERROR 2------------");
    let { status = 500, message = "Some Error Occurred" } = err;
    res.status(status).send(message);
});
  
// --------------------- Route with Custom Error Throwing ---------------------

// This route demonstrates throwing a custom error using a custom error class (ExpressError).
// When this error is thrown, it is caught by the error handling middleware above.
app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access to Admin is Forbidden");
});
  
// Start the server on port 8080.
app.listen(8080, () => {
    console.log("server is running at port 8080");
});
