
const express = require('express');
const http = require('http');
require("./api/config/database")
require("dotenv/config")
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const auth = require("./api/routes/user.routes")
// Serve static files
const path = require('node:path');
const CryptoJS = require('crypto-js');
const secretKey = process.env.ENCRYPT_KEY; // Use the same key as in the frontend
console.log(secretKey)
// app.use
const multer = require('multer');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/api/auth", auth)
const upload = multer({
  dest: path.join(__dirname, 'uploads'), // Folder to store uploaded images
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

app.post('/api/messages', upload.single('image'), (req, res) => {
  const { name, message, timestamp } = req.body;
  console.log("M ",message);
  let imageUrl = null;

  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`; // Construct the image URL
  }
  const bytes = CryptoJS.AES.decrypt(message, secretKey);
  decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
  // Emit the message to all connected clients
  io.emit('receiveMessage', { name, message:decryptedMessage, timestamp, imageUrl });

  res.json({ success: true });  
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve the full-page message box
app.get('/message-box', (req, res) => {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);
    io.emit('receiveMessage', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


