
const User = require('../models/user.model'); // Adjust the path based on your project structure
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dateGenerator } = require('../utils');

const JWT_SECRET = process.env.JWT_SECRET; // Consider moving this to a config file or environment variable

const registerUserController = async (req, res) => {
  try {
    // Extract user data from request body
    const {  email ,password,name } = req.body;
console.log("Body ",req.body);
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      
      email,name,
      password: hashedPassword
    });

    await user.save();

    // Generate a JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' } // Token expiration time
    );

    // Update the user with the token
    user.token = jwtToken;
    await user.save();

    // Respond with the created user and token
    res.status(201).json({
      message: 'Registered successfully',
      success: true,
      data: user,
      token: jwtToken,
      error: []
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Registration failed',
      success: false,
      data: [],
      token: '',
      error: error.message
    });
  }
};


const loginUserController = async (req, res) => {
    try {
      // Extract user data from request body
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const jwtToken = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '30d' } // Token expiration time
      );
  
      // Respond with the user and token
      res.status(200).json({
        message: 'Login successful',
        success: true,
        data: user,
        token: jwtToken,
        error: []
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Login failed',
        success: false,
        data: [],
        token: '',
        error: error.message
      });
    }
  };
  
  const getAllUsersController = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Assuming you have a dateGenerator function that generates an array of date strings (YYYY-MM-DD)
      const datesArray = dateGenerator(startDate, endDate);
  
      // Create a match object with regular expressions for partial date matching
      const match = {};
  
      if (datesArray && datesArray.length > 0) {
        // Create a $regex condition for each date in the array
        match.createdAt = {
          $in: datesArray.map(date => new RegExp(`^${date}`)), // Match any createdAt that starts with the date
        };
      }
  
      // Use aggregation with $match
      const users = await User.aggregate([
        { $match: match }, // Match users based on the conditions
      ]);
  
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ error: error.message, data: [] });
    }
  };
  
// Get a single user by ID
const getUserByIdController = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Update a user by ID
const updateUserController = async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }); // Returns the updated document
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({data:updatedUser});
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message }); // Adjust status code as needed based on error type
    }
  };


  const updatePasswordController = async (req, res) => {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'New password is required' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password
        user.password = hashedPassword;
        await user.save(); // Save the updated user

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message }); // Adjust status code as needed based on error type
    }
};

  const deleteUserController = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(204).send(); // No content to send, just success signal
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports={
    registerUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    loginUserController,updatePasswordController
 };
