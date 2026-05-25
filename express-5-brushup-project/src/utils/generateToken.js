//* JWT token generator function
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRETKEY, {
    expiresIn: 60 * 60,
  });
  return token;
};
