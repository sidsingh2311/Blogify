📝 Blogify – MERN Blog Application

A full-stack Blog Application built using the MERN Stack (MongoDB, Express, React, Node.js) with complete authentication and authorization system.

Users can register, login, create blogs, edit their own blogs, and comment on other users’ blogs.

🚀 Features
🔐 Authentication & Authorization

User Registration

User Login

JWT-based Authentication

Protected Routes

Role-based Authorization (Users can only edit/delete their own blogs)

📝 Blog Management

Create Blog

Edit Blog

Delete Blog

View All Blogs

View Single Blog

💬 Comments

Add comments on other users' blogs

View all comments under a blog

👤 User Features

Secure password hashing

Token-based session management

Protected dashboard

🛠 Tech Stack
Frontend

React.js

Context API

Axios

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

bcrypt (Password Hashing)

📂 Project Structure
blogapp/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/blogify.git
cd blogify
2️⃣ Setup Backend
cd backend
npm install

Create a .env file inside backend folder:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend:

npm run dev
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev
🌍 Environment Variables

Backend requires:

MONGODB_URI
JWT_SECRET
PORT
🔒 Security Features

Passwords hashed using bcrypt

JWT stored securely

Protected API routes

Ownership validation for blog editing/deleting
