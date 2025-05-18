const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
} = {}) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // create user (ensure your schema uses 'password', not 'hashPassword')
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword, // fixed field name
      role: role || "user",
    });

    await user.save();

    // Return user data without the password
    const { password: _, ...userData } = user.toObject();
    return userData;
  } catch (error) {
    throw new Error(`User creation failed: ${error.message}`);
  }
};
const authenticationUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password!");
    }

    // Optional: remove password before returning
    const { password: _, ...userData } = user.toObject();
    return userData;
  } catch (error) {
    throw new Error(`User login failed: ${error.message}`);
  }
};

module.exports = {
  createUser,
  authenticationUser,
};
