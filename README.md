# Simple DevOps: Frontend ↔ Backend (Docker, Compose, Prometheus, Grafana)

**What you get**
- Minimal **Express** backend with `/api/hello` and `/metrics` (Prometheus).
- **Nginx** frontend serving static `index.html` and proxying `/api` → backend.
- One-command run with **Docker Compose**.
- Optional monitoring via **Prometheus** (9090) and **Grafana** (3000).

## Quick Start (Local)
1. Install Docker Desktop (or Docker Engine + Compose v2).
2. In this folder:
   ```bash
   docker compose up -d --build
   ```
3. Open:
   - Frontend: http://localhost:8080
   - Prometheus: http://localhost:9090 (scrapes `backend:4000/metrics`)
   - Grafana: http://localhost:3000 (login admin/admin)

## Stop everything
```bash
docker compose down
```

## Run on AWS EC2 (quick guide)
1. Launch an Ubuntu EC2. Open inbound ports **8080**, **3000**, **9090** (and **22** for SSH).
2. SSH in, then install Docker:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   # log out & back in, or run: newgrp docker
   ```
3. Copy this project to the server (SCP or git). Then run:
   ```bash
   docker compose up -d --build
   ```
4. Visit `http://EC2_PUBLIC_IP:8080` for the app.

## Notes
- Change `ports` in `docker-compose.yml` if you want the frontend on port 80 (e.g., `"80:80"`).
- In Grafana, add Prometheus datasource at `http://prometheus:9090` and import a Node.js/Express dashboard, or build your own using the `process_` and `nodejs_` metrics from `/metrics`.
