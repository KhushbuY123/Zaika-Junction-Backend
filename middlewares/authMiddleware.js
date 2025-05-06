// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

const JWT_SECRET = "yourSuperSecretKey";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Authorization token missing." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedUnsafe = jwt.decode(token, { complete: true });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request
    next(); // Continue to the protected route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
