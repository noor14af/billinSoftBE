const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Token Required!" });
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid Token" });
    }

    // Attach the decoded data to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
