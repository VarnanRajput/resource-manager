🚀 Resource Manager Web App -

A full-stack MERN-based web application that helps users efficiently store, organize, and share useful digital resources such as links, tools, and learning materials.

📌 Overview-
The Resource Manager is designed to solve the problem of scattered bookmarks and unorganized resources. It provides a centralized platform where users can securely manage their resources, mark favorites, and share them with others using unique links.

✨ Features-

🔐 User Authentication
Signup & Login system
Token-based authentication
Protected routes

📁 Resource Management
Add, edit, delete resources
View all resources in dashboard

⭐ Favorites System
Mark/unmark important resources
Separate favorites section

🔗 Sharing Functionality
Share individual resources
Share entire collections
Public access via unique links

🔍 Clean UI & Navigation
Responsive React interface
Easy-to-use dashboard

🛠️ Tech Stack
Frontend-
React.js
React Router
JavaScript (ES6+)
CSS

Backend-
Node.js
Express.js

Database-
MongoDB
Mongoose

Other Tools-
REST APIs
CORS
Environment Variables
Vercel, Render, MongoDB Atlas (Deployment)

⚙️ Installation & Setup-
1️⃣ Clone the Repository
git clone https://github.com/VarnanRajput/resource-manager.git
cd resource-manager

2️⃣ Setup Backend
cd backend
npm install

Create a .env file in backend folder:

PORT=5000
MONGO_URI=mongodb+srv://rajputvarnan22_db_user:TA7L05LlOkxdbaPN@cluster0.gaf7q0w.mongodb.net/?appName=Cluster0
JWT_SECRET=varnanlovesvarnan

Run backend:

npm start

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

🌐 Usage Flow
Sign up or log in
Add resources (name, description, link)
View and manage resources in dashboard
Mark important ones as favorites
Share resources or collections via link
Access shared content without login

📡 API Endpoints
/auth → User authentication
/resources → CRUD operations
/share → Share resources/collections
/health → Server check

📂 Project Structure
resource-manager/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── README.md

🚀 Future Improvements-
User profiles
AI-based recommendations

🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

📎 GitHub Link

https://github.com/VarnanRajput/resource-manager

📜 License

This project is open-source and available under the MIT License.

💡 Author

Developed by - Varnan Rajput
