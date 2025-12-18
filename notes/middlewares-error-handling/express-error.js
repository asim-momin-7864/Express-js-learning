// Custom Error Class for Express Applications
// Main Concept:
//   This class extends the built-in Error class to allow the creation of error objects
//   with additional properties such as status and message.
//   It standardizes error responses across the application.

class ExpressError extends Error {
    // The constructor accepts a status code and an error message.
    // These properties are then attached to the error instance.
    constructor(status, message) {
        super(); // Calls the parent Error class constructor.
        this.status = status; // Custom HTTP status code (e.g., 404, 403, 500).
        this.message = message; // Custom error message.
    }
}

module.exports = ExpressError;
