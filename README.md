# 📚 Resource Manager

A full-stack web app to store, manage, and organize useful resources (links, notes, references).

## Tech Stack
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB (local Community Server)
- **Auth**: JWT

---

## 🚀 How to Run (3 steps)

### Step 1 — Make sure MongoDB is running

MongoDB Community Server must be installed and running locally.

**Windows:**
```
net start MongoDB
```
Or open **Services** → find **MongoDB** → Start

**Mac (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start mongod
```

> MongoDB runs on `mongodb://127.0.0.1:27017` by default. No setup needed — the app creates the `resourcemanager` database automatically.

---

### Step 2 — Install all dependencies (one time only)

Open a terminal in the `resource-manager` folder and run:

```bash
npm run install:all
```

This installs dependencies for both frontend and backend.

---

### Step 3 — Start the app

```bash
npm run dev
```

This single command starts **both** servers at once:
- 🟢 Backend  → http://localhost:5000
- 🟢 Frontend → http://localhost:5173

Open your browser at **http://localhost:5173** and you're good to go!

---

## 📁 Folder Structure

```
resource-manager/
├── package.json          ← root scripts (run both servers)
│
├── backend/
│   ├── server.js         ← Express entry point
│   ├── .env              ← config (port, DB URL, JWT secret)
│   ├── models/
│   │   ├── User.js
│   │   └── Resource.js
│   ├── routes/
│   │   ├── auth.js       ← /auth/login, /auth/signup
│   │   └── resources.js  ← CRUD + favorite toggle
│   └── middleware/
│       └── authMiddleware.js
│
└── frontend/
    └── src/
        ├── api.js            ← all fetch calls in one place
        ├── App.jsx           ← routes
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ResourceCard.jsx
        │   └── ResourceForm.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   ├── Dashboard.jsx
        │   ├── Resources.jsx
        │   ├── AddEditResource.jsx
        │   └── Favorites.jsx
        └── styles/
            └── global.css
```

---

## 🔑 Features

- **Auth**: Sign up / log in / log out with JWT
- **Dashboard**: Stats overview + recent resources
- **Resources**: Add, edit, delete, search, filter by category
- **Favorites**: Star any resource, view them on a dedicated page
