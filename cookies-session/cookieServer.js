/*  
  ? What Are Cookies?
    Cookies are small pieces of data stored in the user's browser.
    They are sent from the server to the client and stored on the client’s machine.
    They help in:
      - Session management (e.g., login sessions).
      - Personalization (e.g., user preferences).
      - Tracking (e.g., analytics and user behavior).
*/

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Initialize cookie-parser middleware with a secret for signed cookies
app.use(cookieParser("secretcode"));

/*  
  Route: /random
  Purpose: Send an unsigned cookie to the client's browser.
  How it works:
    - res.cookie() attaches a cookie named "username" with the given value.
    - The cookie will be stored on the client and sent back with subsequent requests.
*/
app.get("/random", (req, res) => {
    res.cookie("username", "@_asim_123");
    res.send("This route is used to send cookies");
});

/*  
  Route: /info
  Purpose: Retrieve and use an unsigned cookie from the request.
  Data Flow:
    - The browser sends the stored cookie in the request.
    - The cookie-parser middleware populates req.cookies.
    - The code extracts "username" from req.cookies and sends it back.
*/
app.get("/info", (req, res)=> {
    let { username } = req.cookies;
    console.dir(req.cookies);
    res.send(`Hi, ${username}`);
});

/*  
  Route: /getsignedcookies
  Purpose: Send a signed (encrypted) cookie to the client.
  How it works:
    - Setting {signed: true} tells cookie-parser to sign the cookie.
    - Signed cookies are stored separately in req.signedCookies for verification.
*/
app.get("/getsignedcookies", (req, res) => {
    res.cookie("made-in", "India", { signed: true });
    res.send("This page is used to send signedCookies");
});

/*  
  Route: /verify
  Purpose: Access and display both unsigned and signed cookies.
  Data Flow:
    - req.cookies contains unsigned cookies.
    - req.signedCookies contains signed cookies (after verification).
    - This route demonstrates how to retrieve both types.
*/
app.get("/verify", (req, res) => {
    console.log("Unsigned cookies :- ", req.cookies);
    console.log("Signed cookies :- ", req.signedCookies);
    res.send("This page gets both Signed and Unsigned cookies and prints them");
});

app.listen(3000, () => {
    console.log("server is running on port @3000");
});
