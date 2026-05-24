// packages import
import jwt from "jsonwebtoken";


const generateJwtAndSetCookie = (userID, res) => {
 try {

  console.log("Setting JWT cookie for user:", userID);

   // generate token
  var token = jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  // store in secure cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // users cannot access , accessible to http only, role => prevent XSS / cross site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV === "production", // Only true in prod,
    signed: true,
  });
 } catch (error) {

   console.error("Error in generateJwtAndSetCookie", error);
   res.status(500).json({error: "Internal Server Error"});

 }
};

export default generateJwtAndSetCookie;

/*

=========================
🔐 Signed Cookies vs JWT
=========================

📦 Who Provides It?
---------------------
- Signed cookies are NOT built-in to Express.
- They are provided by the `cookie-parser` npm package.
- JWT is handled by the `jsonwebtoken` package.

🧠 What is a Signed Cookie?
-----------------------------
- A cookie with a server-side signature to ensure it wasn't tampered with.
- Signature is generated using your secret key.
- The value is not encrypted, but it's protected from being modified by the client.

🛡️ How Signed Cookies Work
-----------------------------
1. When you set a cookie like:
    res.cookie("jwt", token, { signed: true });

2. `cookie-parser` signs the value using your secret.
   It becomes something like:
   jwt=s:abc123.dfd56a0aa2...

3. When the client sends it back, Express verifies the signature:
    const token = req.signedCookies.jwt;

   - ✅ If valid → returns the original value
   - ❌ If tampered → returns `undefined`

🔑 Use in Express
-----------------------------
1. Add cookie-parser with your secret:
    app.use(cookieParser(process.env.JWT_SECRET_KEY));

2. Set cookie with `signed: true`:
    res.cookie("jwt", token, {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

3. Access cookie securely:
    const token = req.signedCookies.jwt;

=======================================
⚖️ Signed Cookie vs JWT Authentication
=======================================

| Feature            | Signed Cookies                       | JWT (jsonwebtoken)                   |
|--------------------|--------------------------------------|--------------------------------------|
| Who signs it?      | cookie-parser                        | jsonwebtoken                         |
| What is signed?    | The cookie value (e.g. JWT string)   | The payload inside the token         |
| Self-contained?    | ❌ No                                 | ✅ Yes                                |
| Use case           | Tamper-proof transport               | Full user authentication & identity  |
| Frontend access?   | ❌ No if httpOnly                    | ❌ No if httpOnly                    |

🎯 Best Practice:
-------------------
- Use **JWT** for authentication
- Store it in a **signed + httpOnly cookie**
- This gives:
  ✅ JWT for user identity + expiration
  ✅ Signed cookie for tamper protection

===============================================

Use signed: true only if:

- You want to double check that the cookie itself was not tampered with on the client-side before you even try decoding it.
- You store other non-JWT values in cookies and want to secure them too.


*/
