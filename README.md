# AI-Powered Web App – Technical Assessment

Welcome to my submission for the **AI Coding Assistant Technical Assessment**. This repository contains a simple web application that leverages a Rust backend with Axum and a TypeScript frontend. The project integrates a Large Language Model (LLM) using the OpenRouter API to demonstrate AI-assisted responses.

---

## 🌐 Live Application
[https://rust-project-0hsp.shuttle.app](https://rust-project-0hsp.shuttle.app)

---

## 📂 Project Structure
```
├── backend/              # Rust + Axum + Shuttle API backend
│   ├── src/
│   │   └── main.rs       # Main Axum application
│   ├── Cargo.toml        # Dependencies and metadata
│   └── ...
├── frontend/             # TypeScript frontend (React / Vite / etc.)
│   ├── src/
│   ├── public/
│   └── ...
└── README.md             # This file
```

---

## 🧠 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | TypeScript, React (Vite) |
| Backend      | Rust, Axum, Shuttle     |
| AI           | DeepSeek via OpenRouter API |
| Deployment   | Shuttle (backend), Vercel (frontend) |

---

## ⚙️ Setup Instructions (Local)

### Prerequisites
- [Node.js (v14+)](https://nodejs.org/)
- [Rust + Cargo](https://www.rust-lang.org/tools/install)
- [Shuttle CLI](https://www.shuttle.rs/docs/introduction/installation)
- `.env` file or hardcoded Bearer API key (OpenRouter)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ai-assistant-assessment.git
cd ai-assistant-assessment
```

### 2. Run Backend (Rust + Shuttle)
```bash
cd backend
shuttle run
```

### 3. Run Frontend (React/Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Endpoint

**POST** `/chat`

**Request Body:**
```json
{
  "prompt": "What is Rust?"
}
```

**Response:**
```json
{
  "response": "Rust is a systems programming language focused on safety and performance."
}
```

---

## 🧱 Architecture & Design Decisions
- Used Shuttle for **zero-infra** backend deployment.
- Axum router provides fast async endpoints.
- OpenRouter used as a universal gateway to multiple LLMs (free & paid).
- Simple REST structure enables easy frontend/backend scaling.

---

## 🔧 Challenges
- Lack of native Rust SDKs for OpenRouter required custom request building.
- DeepSeek LLMs have intermittent latency or 500 errors (handled fallback with message).
- Quick bootstrapping of frontend with proper UX in short time.

---

## 🧩 Trade-offs & Improvements
- Currently using blocking `reqwest` + `.text()` for JSON response parsing — should use structured deserialization.
- Add client-side error boundaries for AI errors.
- Support streamed responses and markdown rendering.

---

## 👨‍💻 Author
**Alae Eddine Jahid**  
GitHub: [github.com/Alae-J](https://github.com/Alae-J)  
Portfolio: [alae-gijutsu.vercel.app](https://alae-gijutsu.vercel.app)

---

## 🏁 Submission Details
- ✅ Live deployed backend (Shuttle)
- ✅ Source code with commit history
- ✅ AI functionality with free model
- ✅ Setup guide + architecture summary
- ✅ 2-hour build time compliance

---

Thank you for reviewing my assessment! 🚀
