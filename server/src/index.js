import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"

import { config } from "./config.js"
import { openapiSpec } from "./openapi.js"
import { authRouter } from "./routes/auth.routes.js"
import { employeesRouter } from "./routes/employees.routes.js"

const app = express()

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  }),
)
app.use(express.json())

// Health check.
app.get("/", (_req, res) => {
  res.json({ name: "fe-test-server", status: "ok", docs: "/docs" })
})

// Interactive API docs (Swagger UI) + raw OpenAPI JSON.
app.get("/openapi.json", (_req, res) => res.json(openapiSpec))
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec))

app.use("/auth", authRouter)
app.use("/employees", employeesRouter)

// 404 fallback.
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" })
})

// Centralized error handler (e.g. malformed JSON body).
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Body JSON không hợp lệ" })
  }
  console.error(err)
  res.status(500).json({ message: "Internal server error" })
})

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`)
  console.log(`API docs (Swagger): http://localhost:${config.port}/docs`)
  console.log(`CORS origins: ${config.corsOrigins.join(", ")}`)
  console.log("Seeded logins:")
  console.log("  admin@example.com / admin123     (role: admin)")
  console.log("  employee@example.com / employee123 (role: employee)")
})
