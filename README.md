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
│   └── Secrets.toml      # Contains AI_API_KEY (for Shuttle)
├── frontend/             # React frontend (Vite + TypeScript)
│   ├── src/              # Components, hooks, pages
│   └── .env              # VITE_API_URL loaded here
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

Create a `Secrets.toml` file inside the `backend/` folder:

```toml
AI_API_KEY = "your-openrouter-key-here"
```

Then run:

```bash
cd backend
shuttle run
```

> Starts on `http://127.0.0.1:8000`

---

### 3️⃣ Frontend Setup (React + Vite)

In `frontend/.env`, set the backend URL:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then run:

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

🔁 Prompt-engineered for clarity.
📅 Clean AI response handled in backend.

---

## 🧠 Prompt Engineering Strategy

The prompt sent to the LLM:

```
Rephrase the following sentence in a clear, concise, and natural tone. Keep the original meaning exactly. Do not include emojis, quotation marks, or explanations. Only return the rewritten sentence:

{user input}
```

Ensures:

* Clean output with no extra formatting
* Accurate semantic preservation
* Non-chatbot, one-line replies

---

## 🛡️ Architecture Decisions

| Layer    | Stack                                |
| -------- | ------------------------------------ |
| Frontend | React + Vite + Tailwind              |
| Backend  | Rust (Axum) + Shuttle                |
| AI       | DeepSeek via OpenRouter              |
| Hosting  | Shuttle (backend), Vercel (frontend) |

---

## ⚠️ Known Limitations

* Response parsing uses generic `serde_json::Value`
* No history or login system
* No streamed or chunked response support

---

## 🧠 Ideas for Improvement

* Streamed responses for larger inputs
* Tone/language customization options
* Model selector UI
* Offline saving of paraphrased results

---

## 👨‍💻 Author

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
