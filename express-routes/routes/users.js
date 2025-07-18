const express = require("express");
const router = express.Router();

/*
  This module handles routes related to users.
  Grouping user-specific endpoints in a separate router makes the code modular and easier to maintain.
*/

// Route: GET /users
// Purpose: Entry point for users-related requests.
router.get("/", (req, res) => {
    res.send("This is users route");
});

// Route: GET /users/:id/show
// Purpose: Retrieve and display details of a specific user by their ID.
router.get("/:id/show", (req, res) => {
    let { id } = req.params;
    res.send(`This is Users show route for ID - ${id}`);
});

// Route: GET /users/:id/update
// Purpose: Render an interface or process an update for a user specified by ID.
router.get("/:id/update", (req, res) => {
    let { id } = req.params;
    res.send(`This is Users update route for ID - ${id}`);
});

// Route: GET /users/:id/delete
// Purpose: Handle the deletion of a user by ID.
router.get("/:id/delete", (req, res) => {
    let { id } = req.params;
    res.send(`This is Users Delete route for ID - ${id}`);
});

module.exports = router;
