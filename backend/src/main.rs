use shuttle_axum::axum::{routing::{get, post}, Json, Router};
use shuttle_axum::ShuttleAxum;
use serde::{Deserialize, Serialize};
use serde_json::json;
use tower_http::cors::CorsLayer;
use dotenvy::dotenv;
use std::env;

#[derive(Deserialize)]
struct ChatRequest {
    prompt: String,
}

#[derive(Serialize)]
struct ChatResponse {
    paraphrasedText: String,
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}

async fn chat_ai(Json(payload): Json<ChatRequest>) -> Json<ChatResponse> {
    let client = reqwest::Client::new();

    let api_key = env::var("AI_API_KEY").unwrap_or_else(|_| {
        eprintln!("⚠️ AI_API_KEY not found in environment.");
        "missing-key".into()
    });

    let engineered_prompt = format!(
        "Rewrite the following text in a different wording, while preserving the original meaning. Do not add emojis, and do not surround the result with quotes:\n\n{}",
        payload.prompt
    );

    let res = client
        .post("https://openrouter.ai/api/v1/chat/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&json!({
            "model": "deepseek/deepseek-chat:free",
            "messages": [{ "role": "user", "content": engineered_prompt }]
        }))
        .send()
        .await;

    match res {
        Ok(resp) => {
            let body = resp.text().await.unwrap_or("Failed to read response".into());
            let parsed: serde_json::Value = serde_json::from_str(&body).unwrap_or_default();
            let mut text = parsed["choices"][0]["message"]["content"]
                .as_str()
                .unwrap_or("AI response not found")
                .trim()
                .to_string();

            // Remove starting and ending quotes if they exist
            if text.starts_with('"') && text.ends_with('"') && text.len() > 1 {
                text = text[1..text.len() - 1].to_string();
            }

            Json(ChatResponse { paraphrasedText: text })
        }
        Err(e) => Json(ChatResponse {
            paraphrasedText: format!("Request failed: {}", e),
        }),
    }
}

#[shuttle_runtime::main]
async fn main() -> ShuttleAxum {
    dotenv().ok(); // ✅ Load environment variables from .env

    let cors = CorsLayer::permissive();

    let app = Router::new()
        .route("/", get(hello_world))
        .route("/paraphrase", post(chat_ai))
        .layer(cors);

    Ok(app.into())
}
