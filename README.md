


 Real-Time Chat Application 📱💬

A real-time chat application that supports text and image messaging. It includes user authentication, a responsive UI, and real-time communication using Socket.IO and Node.js. Users can send text and images, which are automatically resized to 200x200 pixels for a consistent chat experience.

---

 Features 🌟

- User Authentication: Secure login and signup system using MongoDB.
- Real-Time Messaging: Powered by Socket.IO.
- Image Upload: Supports image attachments,

- Backend Image Processing: Uses multer  uploaded images.
- Easy Setup: Quick to set up and start chatting.

---



 Technologies Used 🛠️

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- WebSocket: Socket.IO
- Image Processing: multer 

---

 Setup Guide 🚀

 Prerequisites 📋

- Node.js (v14 or above)
- MongoDB installed locally or a MongoDB Atlas account
- A code editor like VS Code

---

 Step 1: Clone the Repository 🖥️


git clone https://github.com/Mayuradlak123/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application


---

 Step 2: Install Dependencies 📦

Run the following command to install the required packages:


npm install


---

 Step 3: Configure the Environment 🌐

Create a .env file in the root directory and add the following variables:

env
PORT=3000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_secret_key


If you're using MongoDB Atlas, replace MONGO_URI with your connection string:

env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatapp?retryWrites=true&w=majority


---

 Step 4: Start the Application ▶️

Start the backend server:


npm start


Your server will be running at: [http://localhost:3000](http://localhost:3000)

---

 Step 5: Access the Chat Application 🌐

- Open a browser and navigate to: [http://localhost:3000/message-box](http://localhost:3000/message-box)
- Login or sign up to start chatting!



 Folder Structure 📁

plaintext
realtime-chat-app/
├── public/
│   ├── index.html        Frontend UI
│   └── css/              Stylesheets
├── uploads/              Stores uploaded images
├── api/
│   ├── routes/           API routes
│   └── controllers/      Logic for handling requests
├── models/               MongoDB schemas
├── config/
│   ├── database.js       MongoDB connection
├── .env                  Environment variables
├── server.js             Main server file
└── package.json          Project metadata and dependencies


---

 API Endpoints 🛡️

 User Authentication
- POST /api/user/register  
  - Create a new user account.  
  - Request body: { name, email, password }  

- POST /api/user/login  
  - Authenticate a user and get a token.  
  - Request body: { email, password }  

 Messaging
- POST /api/messages  
  - Send a message with optional image upload.  
  - Request body (form-data): { message, image, userName, timestamp }  


---

 Key Features in Code 📝


javascript
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});




![image](https://github.com/user-attachments/assets/c37ef362-6bca-439b-83ee-679fe48d2537)
Message Encryption 
![image](https://github.com/user-attachments/assets/58c53556-71c0-4214-a1a2-fa78655fdc7c)


Message Decryption and Image Upload functionality 

![image](https://github.com/user-attachments/assets/d09d9d48-4870-4ed7-a648-3144ab0a54d9)


Login Page 
![image](https://github.com/user-attachments/assets/0f63e970-8630-4646-a967-a3ad8caa1a1b)

SignUp Page

![image](https://github.com/user-attachments/assets/d53abc9c-47b2-405c-b1a1-6cbd3bdc9122)

