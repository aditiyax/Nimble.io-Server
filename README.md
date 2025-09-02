# Nimble.io — Backend

This is the **server-side/backend** of **nimble.io**, a next-generation browser-based IDE with **AI-assisted coding**.  
The backend powers authentication, user management, and AI-enhanced chat services that connect with **Google Gemini** and **StackBlitz** web containers.

---

## 🚀 Features

### 🔑 Auth Service
- Handles **user authentication** and **authorization**.
- Manages login, signup, sessions, and security.

### 👤 User Service
- Provides **user profile management**.
- Supports full **CRUD operations** (create, read, update, delete).
- Stores and updates user details.

### 💬 Chat Service
- Core logic for **AI-driven coding sessions**.
- Users send prompts → backend processes & enhances them → forwards to **Gemini LLM**.
- Receives structured responses, parses them, and presents code suggestions.
- Integrates with **StackBlitz.io containers** for compiling and running code.
- Enables an interactive coding environment where users can:
  - Explore generated code
  - Ask questions about their project
  - Make changes with AI support

---

## 🛠️ Tech Stack
- **Node.js / Express** (server framework)
- **Gemini LLM API** (AI-powered responses)
- **StackBlitz Web Containers** (browser-based compilation & execution)
- **REST/GraphQL APIs** for modular services

---
## ⚙️ Setup & Installation

  1. Clone the repository:
   ```bash
   git clone https://github.com/aditiyax/Nimble.io-Server.git
   cd nimble.io-server
   ```


 2. Install dependencies::
 ```bash
  npm install
 ```


 3. Setup environment variables (.env):
 ```env
   PORT=3000
   GEMINI_API_KEY=your_api_key_here
   STACKBLITZ_API_KEY=your_api_key_here
   DATABASE_URL=your_database_url_here
 ```

4. Start the server:
   ```bash
   npm run dev
   ```


---

## 📖 Usage Flow

1. User signs up / logs in via **Auth Service**.  
2. **User Service** manages and persists their details.  
3. Through **Chat Service**, users interact with Gemini:
   - Send prompts and questions  
   - Receive parsed, structured code  
   - Compile & run code in a **StackBlitz container**  
   - Continue iterating with AI in an integrated IDE.  

---

## 🌐 Vision

nimble.io brings the **power of LLMs + cloud IDEs** together:

- Write, run, and iterate code directly in the browser  
- Seamless AI-powered assistance  
- No local setup — everything runs in the cloud  

---

## 📜 License

MIT License — free to use, modify, and distribute.
   
