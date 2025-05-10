# 🧠 AI Paraphrasing Web App – Technical Assessment

Welcome to my submission for the **AI Coding Assistant Technical Assessment**. This repository features a full-stack web application that paraphrases text using an AI model via the OpenRouter API. It includes:

* A **Rust backend** built with Axum and deployed using Shuttle
* A **React + TypeScript frontend** using Vite
* **LLM integration** via DeepSeek hosted on OpenRouter

---

## 🌐 Live Demo

👉 [https://rust-project-0hsp.shuttle.app](https://rust-project-0hsp.shuttle.app)

---

## 📁 Project Structure

```bash
ai-paraphraser-assessment/
├── backend/              # Rust backend (Axum + Shuttle)
│   ├── src/main.rs       # Main logic
│   ├── Cargo.toml        # Crate config
│   └── .env              # Contains AI_API_KEY
├── frontend/             # React frontend (Vite + TypeScript)
│   ├── src/              # Components, hooks, pages
│   └── vite.config.ts    # VITE_API_URL loaded here
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

* [Node.js](https://nodejs.org/) (v16+)
* [Rust + Cargo](https://www.rust-lang.org/tools/install)
* [Shuttle CLI](https://www.shuttle.rs/docs/introduction/installation)
* OpenRouter API key (e.g. DeepSeek free tier)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ai-paraphraser-assessment.git
cd ai-paraphraser-assessment
```

---

### 2️⃣ Backend Setup (Rust + Shuttle)

**`.env` file required in `/backend`:**

```env
AI_API_KEY=your-openrouter-key-here
```

Then:

```bash
cd backend
shuttle run
```

> Starts on `http://127.0.0.1:8000`

---

### 3️⃣ Frontend Setup (React + Vite)

```env
# In frontend/.env
VITE_API_URL=http://127.0.0.1:8000
```

```bash
cd ../frontend
npm install
npm run dev
```

> Visit `http://localhost:5173`

---

## 🚀 API Overview

### POST `/paraphrase`

**Request:**

```json
{
  "prompt": "Rewrite this sentence using different words."
}
```

**Response:**

```json
{
  "paraphrasedText": "Restate this sentence with different phrasing."
}
```

✔️ Prompt-engineered to avoid emojis and quotation marks.
✔️ Clean AI response handled in backend.

---

## 🧠 Prompt Engineering Strategy

The prompt sent to the LLM looks like:

```
Paraphrase the following text clearly and concisely, without adding or omitting meaning. Do not add emojis or quotation marks:

{user input}
```

This ensures:

* Clean response without extra formatting
* Accurate semantic preservation
* AI doesn't act as a chatbot

---

## 🛡️ Architecture Decisions

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | React + Vite + Tailwind                    |
| Backend  | Rust (Axum) + Shuttle                      |
| AI       | DeepSeek via OpenRouter                    |
| Hosting  | Shuttle (backend), Local/Vercel (frontend) |

---

## ⚠️ Known Limitations

* Response parsing uses `.text()` + `serde_json::Value` — could be structured better.
* No persistent history / login.
* Basic error handling in frontend.

---

## 🧠 Ideas for Improvement

* Switch to streamed responses for large texts
* Add UI for multiple AI model selection
* Support tone (casual, formal) or language control
* Save past paraphrases locally

---

## 👨‍💼 Author

**Alae Eddine Jahid**
🌐 [alae-gijutsu.vercel.app](https://alae-gijutsu.vercel.app)
🐙 [github.com/Alae-J](https://github.com/Alae-J)

---

## ✅ Submission Checklist

* ✅ Live backend via Shuttle
* ✅ Working frontend + backend integration
* ✅ Prompt-engineered LLM call
* ✅ Free model with OpenRouter
* ✅ Local setup + clear instructions
* ✅ Delivered within 2h build constraint

---

Thank you for reviewing my submission! 🚀
