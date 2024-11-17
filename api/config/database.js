// mongooseConnection.js
require("dotenv/config")
const mongoose = require('mongoose');

// Connection URI
const uri =process.env.DB_URL;
// console.log("UR ",uri)
// Connect to MongoDB
mongoose.connect(uri)
.then(() => {
  console.log('Connected to MongoDB successfully.');
})
.catch((err) => {  
  console.error('Unable to connect to MongoDB:', err);
});

module.exports = mongoose;
