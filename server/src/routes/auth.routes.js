import { Router } from "express"
import { z } from "zod"

import { signToken, verifyPassword } from "../auth.js"
import { findUserByEmail, publicUser } from "../db.js"
import { requireAuth } from "../middleware/auth.js"
import { validateBody } from "../validate.js"

export const authRouter = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

// POST /auth/login → { token, user }
authRouter.post("/login", validateBody(loginSchema), (req, res) => {
  const { email, password } = req.valid
  const user = findUserByEmail(email)

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" })
  }

  const token = signToken(user)
  res.json({ token, user: publicUser(user) })
})

// POST /auth/logout → 204
// JWT is stateless, so logout is handled client-side (drop the token). This
// endpoint exists so the FE has something to call; it always succeeds.
authRouter.post("/logout", (_req, res) => {
  res.status(204).end()
})

// GET /auth/me → { user }  (used to restore the session on refresh)
authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user })
})
