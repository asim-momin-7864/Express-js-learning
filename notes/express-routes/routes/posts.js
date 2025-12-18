const express = require("express");
const router = express.Router();

/*
  This module handles routes related to posts.
  Using the Express Router, we group all post-related endpoints here.
*/

// Route: GET /posts
// Purpose: Entry point for posts-related requests.
router.get("/", (req, res) => {
    res.send("This is posts route");
});

// Route: GET /posts/show/:id
// Purpose: Retrieve and display details of a specific post identified by its ID.
router.get("/show/:id", (req, res) => {
    let { id } = req.params;
    res.send(`This is posts show route for ID - ${id}`);
});

// Route: GET /posts/update/:id
// Purpose: Render an interface or perform an action to update a specific post.
router.get("/update/:id", (req, res) => {
    let { id } = req.params;
    res.send(`This is posts update route for ID - ${id}`);
});

// Route: GET /posts/delete/:id
// Purpose: Handle deletion of a specific post identified by its ID.
router.get("/delete/:id", (req, res) => {
    let { id } = req.params;
    res.send(`This is posts Delete route for ID - ${id}`);
});

module.exports = router;
