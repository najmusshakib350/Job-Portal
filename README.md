# Job Board

A fullstack monorepo project with a Node.js backend and a frontend app.

---

## Project Structure

```
Root/
  apps/
    backend/   # Node.js + Express + Prisma API
    frontend/  # Frontend app
  docker-compose.yml
  package.json
```

---

## Prerequisites

- Node.js 20+
- pnpm
- Docker & Docker Compose

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/najmusshakib350/Job-Portal.git
cd <project-folder>
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Create `.env` inside `apps/backend/`:

```env
DATABASE_URL="postgresql://postgres:123@localhost:5432/job_board?schema=public"
PORT=5000
NODE_ENV=development
```

Create `.env` inside `apps/frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
API_BASE_URL=http://localhost:5000
```

## Running the App

### Option 1 — With Docker (Recommended)

Runs the database backend and frontend together:

```bash
docker-compose up --build
```

### Option 2 — Local Development

Start only the database with Docker:

```bash
docker-compose up dev-db -d
```

Then run backend and frontend separately:

```bash
# Backend
pnpm backend:dev

# Frontend
pnpm frontend:dev
```

---

## Available Scripts

| Script                | Description                    |
| --------------------- | ------------------------------ |
| `pnpm backend:dev`    | Start backend in dev mode      |
| `pnpm backend:build`  | Build backend                  |
| `pnpm frontend:dev`   | Start frontend in dev mode     |
| `pnpm frontend:build` | Build frontend                 |
| `pnpm docker:up`      | Start all services with Docker |
| `pnpm docker:down`    | Stop all Docker services       |
| `pnpm docker:db`      | Start only the database        |
| `pnpm migrate`        | Run database migrations        |

## Access the App

| Name    | URL                         |
| ------- | --------------------------- |
| Public  | http://localhost:3000       |
| Admin   | http://localhost:3000/admin |
| Backend | http://localhost:5000       |
