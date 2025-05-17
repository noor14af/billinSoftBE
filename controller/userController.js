const userServices = require("../services/userServices");
const { generateToken } = require("../config/jwt");

const registerUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body); // added await
    console.log("req.body", req.body);

    res.status(201).json({
      message: "New user created successfully!",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userServices.authenticationUser(emailId, password);

    const token = generateToken({ emailId: user.emailId, role: user.role });
    res.cookie("authToken", token);

    res.status(200).json({
      msg: "Login successful!",
      user,
      token, // optional: you can remove this if only using the cookie
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: error.message || "Login failed!" });
  }
};
module.exports = {
  registerUser,
  loginUser,
};
