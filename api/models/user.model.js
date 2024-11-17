// models/User.js

const mongoose = require('mongoose');
const { getCurrentDateTime } = require('../utils');
const { Schema } = mongoose;
// const {getCu}
// Define the schema for the User model
const userSchema = new Schema({
 
 
    // Authentication token
    token: {
        type: String,
        default: null,
    },

    // User's email, must be unique
    email: {
        type: String,
        required: true,
        unique: true,
    },
   // Timestamps for creation and last update
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: getCurrentDateTime(),
    },

    loginTime: {
        type: String,
        default: getCurrentDateTime(),

    },
    name: {
        type: String,
        default: "",

    },

    updatedAt: {
        type: String,
        default: getCurrentDateTime(),

    }
});

// Create a model based on the schema
const User = mongoose.model('users', userSchema);

module.exports = User;
