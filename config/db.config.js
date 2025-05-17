//import mongoose
const mongoose = require("mongoose");
//make async function to use awiat & use env variable
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Data base connection sucessfully");
  } catch (error) {
    console.log("Data base connection failed", error);
  }
};

module.exports = connectDB;
