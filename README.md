# 🚀 CodePilot – AI Powered Code Editor

CodePilot is a full-stack MERN application that delivers a modern coding experience powered by AI. It mimics features of VS Code + GitHub Copilot, including file management, authentication, and real-time AI code suggestions with streaming.

---

## 🌐 Live Demo

* 🔗 Frontend: https://code-pilot-silk.vercel.app
* 🔗 Backend: https://codepilot-1agq.onrender.com

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Secure cookie handling

### 📁 File System (VS Code-like)

* Create / Read / Update / Delete files
* Create / Delete folders
* Nested folder structure
* File explorer UI

### 🧠 AI Features

* AI Chat (context-aware)
* Code suggestions
* Real-time streaming responses (Copilot-like)
* Multi-language support

### 🧑‍💻 Editor

* Monaco Editor (VS Code engine)
* Syntax highlighting
* Multi-tab support
* Auto-save + Ctrl + S

---

## 🏗️ Architecture

```
                ┌────────────────────┐
                │     Frontend       │
                │  (React + Vite)    │
                │                    │
                │  - Auth Context    │
                │  - Editor Context  │
                │  - File Explorer   │
                │  - Monaco Editor   │
                │  - Copilot Panel   │
                └─────────┬──────────┘
                          │
                          │ HTTP (Axios / Fetch)
                          ▼
                ┌────────────────────┐
                │      Backend       │
                │   (Node + Express) │
                │                    │
                │  - Auth Routes     │
                │  - File Routes     │
                │  - Folder Routes   │
                │  - AI Routes       │
                │                    │
                │  Middleware:       │
                │  - JWT Auth        │
                │  - Error Handler   │
                └─────────┬──────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                                   ▼
┌───────────────┐                  ┌────────────────┐
│   MongoDB     │                  │   Groq API     │
│ (Database)    │                  │ (AI Model)     │
│               │                  │                │
│ - Users       │                  │ - Chat         │
│ - Files       │                  │ - Suggestion   │
│ - Folders     │                  │ - Streaming    │
└───────────────┘                  └────────────────┘
```

---

## 🧩 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios / Fetch API
* Monaco Editor

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### AI

* Groq API (LLaMA 3.3 model)

---

## 📁 Project Structure

```
CodePilot/
│
├── client/                     # Frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── context/           # Global state (Auth, Editor, Files)
│   │   ├── pages/             # Login, Register, Editor
│   │   ├── services/          # API calls
│   │   └── utils/             # Helper functions
│
├── server/                     # Backend
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Auth, error handling
│   │   ├── services/          # AI service logic
│   │   └── utils/             # Response helpers
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URL=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
GROQ_API_KEY=your_api_key
```

---

### Frontend (.env)

```
VITE_API_URL=https://codepilot-1agq.onrender.com/api/v1
```

---

## 🚀 Run Locally

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/codepilot.git
cd codepilot
```

---

### 2️⃣ Start Backend

```
cd server
npm install
npm run dev
```

---

### 3️⃣ Start Frontend

```
cd client
npm install
npm run dev
```

---

## 🌍 Deployment

### Backend (Render)

* Connect GitHub repo
* Add environment variables
* Start command:

```
npm start
```

### Frontend (Vercel)

* Import project
* Add env variable:

```
VITE_API_URL=https://your-backend-url/api/v1
```

---

## ⚠️ Important Notes

* Enable CORS with credentials:

```
origin: frontend_url
credentials: true
```

* Cookies must use:

```
sameSite: "none"
secure: true
```

---

## 🔮 Future Improvements

* ✨ Inline ghost text suggestions (real Copilot feel)
* 👥 Real-time collaboration (Socket.io)
* ▶️ Code execution (multi-language)
* 📦 GitHub integration
* 🧠 AI code explanation

---

## 👨‍💻 Author

**Dev Hatwar**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
