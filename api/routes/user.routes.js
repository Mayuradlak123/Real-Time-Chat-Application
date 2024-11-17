// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
    registerUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,loginUserController,
    deleteUserController,updatePasswordController
} = require("../controller/user.controller"); // Adjust path as necessary

// Register a new user
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Get all users
router.get('/users', getAllUsersController);

// Get a single user by ID
router.get('/users/:id', getUserByIdController);

// Update a user by ID
router.put('/users/:id', updateUserController);
router.put('/update-password/:id', updatePasswordController);

// Delete a user by ID
router.delete('/users/:id', deleteUserController);

module.exports = router;
