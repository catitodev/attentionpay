//! AttentionPay Proxy — Servidor HTTP axum para Solana
//!
//! Intercepta eventos de atenção e coordena micropagamentos
//! via Program Derived Addresses (PDAs) no Solana.
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

use axum::{
    routing::{get, post},
    Router, Json, extract::State,
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, warn};

mod meter;
mod solana_client;
mod config;
mod middleware;

use meter::{AttentionEvent, AttentionMeter};
use solana_client::SolanaClient;
use config::ProxyConfig;

pub struct AppState {
    pub config: ProxyConfig,
    pub meter: AttentionMeter,
    pub solana: SolanaClient,
    pub epoch: RwLock<u32>,
}

#[derive(Debug, Deserialize)]
pub struct AttentionPayload {
    pub user_address: String,
    pub event_type: String,
    pub context: EventContext,
    pub page_url: String,
}

#[derive(Debug, Deserialize)]
pub struct EventContext {
    pub scroll_depth: u32,
    pub time_on_page: u32,
    pub hour: u32,
    pub element_tag: String,
}

#[derive(Debug, Serialize)]
pub struct PayoutResponse {
    pub payout_lamports: u64,
    pub event_id: String,
    pub epoch: u32,
    pub tx_signature: Option<String>,
    pub status: String,
}

#[derive(Debug, Serialize)]
pub struct HealthResponse {
    pub status: String,
    pub epoch: u32,
    pub network: String,
    pub slot: u64,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter("attentionpay_proxy=info,tower_http=debug")
        .init();

    let config = ProxyConfig::from_env()?;
    let solana = SolanaClient::new(&config.rpc_url).await?;

    let state = Arc::new(AppState {
        config: config.clone(),
        meter: AttentionMeter::new(),
        solana,
        epoch: RwLock::new(1),
    });

    let app = Router::new()
        .route("/health", get(health_handler))
        .route("/attention", post(attention_handler))
        .route("/balance/:user", get(balance_handler))
        .layer(tower_http::cors::CorsLayer::permissive())
        .layer(tower_http::trace::TraceLayer::new_for_http())
        .with_state(state.clone());

    let listener = tokio::net::TcpListener::bind(&config.bind_addr).await?;
    info!("🚀 AttentionPay proxy on {}", config.bind_addr);
    info!("🔗 Network: {} | RPC: {}", config.network, config.rpc_url);

    axum::serve(listener, app).await?;
    Ok(())
}

async fn health_handler(State(state): State<Arc<AppState>>) -> Json<HealthResponse> {
    let epoch = *state.epoch.read().await;
    let slot = state.solana.get_slot().await.unwrap_or(0);
    Json(HealthResponse {
        status: "ok".to_string(),
        epoch,
        network: state.config.network.clone(),
        slot,
    })
}

async fn attention_handler(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<AttentionPayload>,
) -> Result<Json<PayoutResponse>, StatusCode> {
    let epoch = *state.epoch.read().await;

    let event = match payload.event_type.as_str() {
        "scroll" => AttentionEvent::Scroll {
            depth: payload.context.scroll_depth,
            pixels: payload.context.time_on_page,
        },
        "click" => AttentionEvent::Click {
            element: payload.context.element_tag.clone(),
        },
        "focus" => AttentionEvent::Focus {
            duration_sec: payload.context.time_on_page,
        },
        _ => {
            warn!("Unknown event type: {}", payload.event_type);
            return Err(StatusCode::BAD_REQUEST);
        }
    };

    if !state.meter.qualify(&event) {
        return Err(StatusCode::TOO_MANY_REQUESTS);
    }

    let payout = state.meter.calculate(
        &event,
        payload.context.scroll_depth,
        payload.context.time_on_page,
        payload.context.hour,
    );

    info!(
        "📊 Event {} from {} | payout: {} lamports | epoch: {}",
        payload.event_type, payload.user_address, payout, epoch
    );

    // Em produção: chama PayoutPolicy CPI via SolanaClient
    let event_id = format!("{}-{}-{}", payload.user_address, epoch, rand::random::<u64>());

    Ok(Json(PayoutResponse {
        payout_lamports: payout as u64,
        event_id,
        epoch,
        tx_signature: None,
        status: "simulated".to_string(),
    }))
}

async fn balance_handler(
    State(state): State<Arc<AppState>>,
    axum::extract::Path(user): axum::extract::Path<String>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let balance = serde_json::json!({
        "user": user,
        "total_lamports": 0,
        "epoch_total": 0,
        "network": state.config.network,
    });
    Ok(Json(balance))
}
