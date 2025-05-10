use axum::{routing::{get, post}, Json, Router, extract::State};
use shuttle_axum::ShuttleAxum;
use shuttle_runtime::SecretStore;
use serde::{Deserialize, Serialize};
use serde_json::json;
use tower_http::cors::CorsLayer;
use std::sync::Arc;

#[derive(Deserialize)]
struct ChatRequest {
    prompt: String,
}

#[derive(Serialize)]
struct ChatResponse {
    paraphrasedText: String,
}

#[derive(Clone)]
struct AppState {
    api_key: Arc<String>,
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}

async fn chat_ai(
    State(state): State<AppState>,
    Json(payload): Json<ChatRequest>,
) -> Json<ChatResponse> {
    let client = reqwest::Client::new();

    // ✅ Strong prompt engineering for precise paraphrasing
    let prompt = format!(
        "Rephrase the following sentence in a clear, concise, and natural tone. Keep the original meaning exactly. Do not include emojis, quotation marks, or explanations. Only return the rewritten sentence:\n\n{}",
        payload.prompt
    );

    let res = client
        .post("https://openrouter.ai/api/v1/chat/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", state.api_key))
        .json(&json!({
            "model": "mistralai/mistral-7b-instruct:free",
            "messages": [{ "role": "user", "content": prompt }]
        }))
        .send()
        .await;

    match res {
        Ok(resp) => {
            let body = resp.text().await.unwrap_or_default();
            let parsed: serde_json::Value = serde_json::from_str(&body).unwrap_or_default();

            let maybe_text = parsed.get("choices")
                .and_then(|c| c.get(0))
                .and_then(|c| c.get("message"))
                .and_then(|m| m.get("content"))
                .and_then(|s| s.as_str());

            Json(ChatResponse {
                paraphrasedText: maybe_text.unwrap_or("⚠️ AI response not found").trim().to_string()
            })
        }
        Err(e) => Json(ChatResponse {
            paraphrasedText: format!("❌ Request failed: {}", e),
        }),
    }
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> ShuttleAxum {
    let cors = CorsLayer::permissive();

    let api_key = secrets.get("AI_API_KEY").unwrap_or_else(|| "missing-key".to_string());

    let state = AppState {
        api_key: Arc::new(api_key),
    };

    let app = Router::new()
        .route("/", get(hello_world))
        .route("/paraphrase", post(chat_ai))
        .with_state(state)
        .layer(cors);

    Ok(app.into())
}
