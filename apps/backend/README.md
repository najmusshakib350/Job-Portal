# Job Board API

A RESTful API for managing job listings and applications, built with **Node.js**, **Express**, **TypeScript**, and **Prisma** (PostgreSQL).

---

## Tech Stack

- Node.js + Express.js
- TypeScript
- Prisma ORM + PostgreSQL
- Zod (validation)
- pnpm

---

## API Endpoints

### Jobs

| Method | Endpoint        | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| GET    | `/api/jobs`     | Get all jobs (supports filter, sort, pagination) |
| GET    | `/api/jobs/:id` | Get a single job                                 |
| POST   | `/api/jobs`     | Create a new job                                 |
| DELETE | `/api/jobs/:id` | Delete a job                                     |

### Applications

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| POST   | `/api/applications`        | Submit an application          |
| GET    | `/api/applications/:jobId` | Get all applications for a job |

---

## Request & Response Examples

### Create a Job — `POST /api/jobs`

```json
// Request
{
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "location": "Dhaka, Bangladesh",
  "category": "Engineering",
  "description": "We are looking for a skilled frontend developer..."
}

// Response 201
{
  "success": true,
  "data": { "id": "uuid", "title": "Frontend Developer", ... }
}
```

### Submit an Application — `POST /api/applications`

```json
// Request
{
  "jobId": "valid-job-uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://example.com/resume.pdf",
  "coverNote": "I am very interested in this position..."
}

// Response 201
{
  "success": true,
  "data": { "id": "uuid", "jobId": "...", "name": "John Doe", ... }
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

| Status | Description                              |
| ------ | ---------------------------------------- |
| 400    | Validation failed                        |
| 404    | Resource not found                       |
| 409    | Duplicate application (same email + job) |
| 500    | Internal server error                    |

---

## Project Architecture

The project follows a modular structure where each module contains its own `controller`, `service`, `routes`, `validation`, and `types`.

- **Controller** — Handles request and response only
- **Service** — Contains all business logic and error handling
- **Validation** — Zod schemas for input validation
- **Types** — TypeScript interfaces in separate files
