import "node:process"

/**
 * Central config, read from environment variables with sensible dev defaults.
 * See `.env.example`. We don't depend on `dotenv` — pass vars via the shell or
 * a process manager if you want to override these.
 */
export const config = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigins: (
    process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:4173"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
}
