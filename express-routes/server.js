const express = require("express");
const app = express();
const users = require("./routes/users.js"); // Import the users router module.
const posts = require("./routes/posts.js"); // Import the posts router module.

/*
  Main Application:
  - Mount the imported routers under specific base paths.
  - This modularizes the routing logic by resource type (users, posts), improving maintainability.
*/

// Mount the users router under the "/users" path.
// All routes defined in users.js will be prefixed with /users.
app.use("/users", users);

// Mount the posts router under the "/posts" path.
// All routes defined in posts.js will be prefixed with /posts.
app.use("/posts", posts);

// Start the server on port 3000.
app.listen(3000, () => {
    console.log("server is running on port @3000");
});
