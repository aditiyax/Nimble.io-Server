# nimble.io — Backend

This is the **server-side backend** of **nimble.io**, a next-generation browser-based IDE with **AI-assisted coding**.  
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

## 📂 Repository Structure
