//import jwt library for handling token
const jwt = require("jsonwebtoken");
//retrive the jwt secret from environemnt variable
const jwtSecret = process.env.JWT_SECRET;
//set the jwt token expiration time
const jwtExpirationTime = "1m";
//generate a jwt token
const generateToken = (payload) => {
  try {
    //sign and return the jwt token
    return jwt.sign({payload}, jwtSecret, { expiresIn: jwtExpirationTime });
  } catch (error) {
    //throw an error if token generation fails
    throw new Error("Failed to token generation");
  }
};
//varify the validity of the token
const tokenVarification = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    // Handle invalid or expired token errors
    console.log("Invalid or expired token");
  }
};
module.exports = {
  generateToken,
  tokenVarification,
};
