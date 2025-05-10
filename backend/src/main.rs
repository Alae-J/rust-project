use shuttle_axum::axum::{routing::get, routing::post, Json, Router};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Deserialize)]
struct ChatRequest {
    prompt: String,
}

#[derive(Serialize)]
struct ChatResponse {
    response: String,
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}

async fn chat_ai(Json(payload): Json<ChatRequest>) -> Json<ChatResponse> {
    let client = reqwest::Client::new();
    let res = client
        .post("https://openrouter.ai/api/v1/chat/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer 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")
        .header("HTTP-Referer", "http://localhost:8000")
        .json(&json!({
            "model": "deepseek/deepseek-chat:free",
            "messages": [
                {"role": "user", "content": payload.prompt}
            ]
        }))
        .send()
        .await;

    match res {
        Ok(response) => {
            let body = response.text().await.unwrap_or("Failed to read response".to_string());
            Json(ChatResponse { response: body })
        }
        Err(_) => Json(ChatResponse {
            response: "Request failed".to_string(),
        }),
    }
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
        .route("/", get(hello_world))
        .route("/chat", post(chat_ai));

    Ok(router.into())
}
