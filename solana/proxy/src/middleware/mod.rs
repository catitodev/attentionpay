//! middleware/mod.rs — Middleware axum
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

use axum::{
    body::Body,
    extract::Request,
    middleware::Next,
    response::Response,
};
use std::time::Instant;
use tracing::{info, warn};

pub async fn attention_logger(req: Request, next: Next) -> Response {
    let start = Instant::now();
    let method = req.method().clone();
    let path = req.uri().path().to_string();

    let res = next.run(req).await;

    let duration = start.elapsed();
    let status = res.status();

    if path.starts_with("/attention") {
        info!(
            method = %method,
            path = %path,
            status = %status,
            duration_ms = %duration.as_millis(),
            "attention event"
        );
    }

    res
}
