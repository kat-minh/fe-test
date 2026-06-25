import { verifyToken } from "../auth.js"
import { findUserById, publicUser } from "../db.js"

/**
 * Requires a valid `Authorization: Bearer <token>` header. On success attaches
 * the public user object to `req.user`.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? ""
  const [scheme, token] = header.split(" ")

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" })
  }

  try {
    const payload = verifyToken(token)
    const user = findUserById(payload.sub)
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" })
    }
    req.user = publicUser(user)
    next()
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

/**
 * Requires the authenticated user to have one of the given roles. Use after
 * `requireAuth`, e.g. `router.get("/admin", requireAuth, requireRole("admin"))`.
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" })
    }
    next()
  }
}
