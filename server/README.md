# FE Test — Reference Backend

A small Node.js (Express) API for the FE intern test. In-memory store, JWT auth,
no database to install. Data resets on every restart.

## Run

```bash
npm install
npm run dev      # http://localhost:4000 (auto-restarts on change)
# or: npm start
```

Point the frontend at it via `VITE_API_BASE_URL` in the FE `.env`:

```
VITE_API_BASE_URL=http://localhost:4000
```

Config is optional — copy `.env.example` to `.env` to override `PORT`,
`JWT_SECRET`, `JWT_EXPIRES_IN`, or `CORS_ORIGIN`.

## Deploy

This is a standalone repo — push it to GitHub and deploy anywhere that runs Node 20+.

**Docker** (works on Render, Railway, Fly.io, a VPS, etc.):

```bash
docker build -t fe-test-server .
docker run -p 4000:4000 \
  -e JWT_SECRET=change-me \
  -e CORS_ORIGIN=https://your-frontend.example.com \
  fe-test-server
```

**Platform without Docker** (Render/Railway native Node): build command
`npm ci`, start command `npm start`. The host injects `PORT` automatically.

In all cases set these env vars in production:

- `JWT_SECRET` — a long random string
- `CORS_ORIGIN` — your deployed frontend origin(s), comma-separated

> Note: the store is **in-memory**, so data resets on every restart/redeploy
> (and isn't shared across multiple instances). That's intended for a test
> backend; swap in a real database if you need persistence.

## API docs (Swagger)

Interactive docs once the server is running:

- Swagger UI: <http://localhost:4000/docs>
- Raw OpenAPI JSON: <http://localhost:4000/openapi.json>

Use the **Authorize** button in Swagger UI: log in via `POST /auth/login`, copy
the `token`, paste it as the Bearer token, then the protected endpoints work.

## Seeded logins

There is **no registration** in this build; use these accounts:

| Email                  | Password      | Role     |
| ---------------------- | ------------- | -------- |
| `admin@example.com`    | `admin123`    | admin    |
| `employee@example.com` | `employee123` | employee |

## Endpoints

| Method | Path             | Auth   | Description                                  |
| ------ | ---------------- | ------ | -------------------------------------------- |
| POST   | `/auth/login`    | —      | `{ email, password }` → `{ token, user }`    |
| POST   | `/auth/logout`   | —      | Always `204` (token is dropped client-side)  |
| GET    | `/auth/me`       | Bearer | `{ user }` — restore session on refresh      |
| GET    | `/employees`     | Bearer | List; `?search=` filters name/email/pos/dept |
| GET    | `/employees/:id` | Bearer | One employee, or `404`                       |
| POST   | `/employees`     | Bearer | Create → `201` employee                      |

Send the token as `Authorization: Bearer <token>`.

### Shapes

```jsonc
// user
{ "id": "u1", "email": "...", "name": "...", "role": "admin" | "employee" }

// employee
{
  "id": "e1",
  "name": "...",
  "email": "...",
  "position": "...",
  "department": "...",
  "status": "active" | "on_leave" | "inactive",
  "createdAt": "ISO-8601"
}
```

### Errors

JSON `{ "message": string }`, plus an optional field map for validation:

```jsonc
{ "message": "Dữ liệu không hợp lệ", "errors": { "email": "Email không hợp lệ" } }
```

Status codes: `400` validation, `401` unauthenticated, `403` wrong role,
`404` not found, `409` duplicate email.
