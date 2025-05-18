//import mongoose and bycrypt for handling schema and password hashing
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
//user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'], //Ensures firstName is provided
        trim: true, // Removes leading/trailing spaces from the first name
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'], // Ensures lastName is provided
        trim: true // Removes leading/trailing spaces from the last name
    },
    // User's email address (required, unique, validated, and converted to lowercase)
    emailId: {
        type: String,
        required: [true, 'Email is required'], // Ensures email is provided
        unique: true, // Ensures email is unique
        lowercase: true, // Converts email to lowercase before saving
        trim: true, // Removes leading/trailing spaces from email
        match: [/.+@.+\..+/, 'Please enter a valid email'] // Validates email format
    },
    // User's password (required, validated for length)
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'] // Validates password length
    },
    role:{
        type:String,
        enum: ['user', 'admin'], // Only allows 'user' or 'admin' as valid roles
        default: 'user' // Defaults to 'user' if no role is provided
    }
});
module.exports = mongoose.model('User', userSchema);