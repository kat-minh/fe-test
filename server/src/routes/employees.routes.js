import { Router } from "express"
import { z } from "zod"

import { createEmployee, employees, findEmployeeById } from "../db.js"
import { requireAuth } from "../middleware/auth.js"
import { validateBody } from "../validate.js"

export const employeesRouter = Router()

// Every employee endpoint requires a logged-in user (any role).
employeesRouter.use(requireAuth)

// GET /employees?search=... → Employee[]
// `search` filters by name / email / position / department (case-insensitive).
// Server-side filtering is supported; the FE may also filter client-side.
employeesRouter.get("/", (req, res) => {
  const search = String(req.query.search ?? "").trim().toLowerCase()

  let result = employees
  if (search) {
    result = employees.filter((e) =>
      [e.name, e.email, e.position, e.department]
        .join(" ")
        .toLowerCase()
        .includes(search),
    )
  }

  res.json(result)
})

// GET /employees/:id → Employee
employeesRouter.get("/:id", (req, res) => {
  const employee = findEmployeeById(req.params.id)
  if (!employee) {
    return res.status(404).json({ message: "Không tìm thấy nhân viên" })
  }
  res.json(employee)
})

const createSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  position: z.string().min(1, "Chức vụ là bắt buộc"),
  department: z.string().min(1, "Phòng ban là bắt buộc"),
  status: z.enum(["active", "on_leave", "inactive"]).optional(),
})

// POST /employees → 201 Employee
employeesRouter.post("/", validateBody(createSchema), (req, res) => {
  const data = req.valid

  const duplicate = employees.some(
    (e) => e.email.toLowerCase() === data.email.toLowerCase(),
  )
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Email đã tồn tại", errors: { email: "Email đã tồn tại" } })
  }

  const employee = createEmployee(data)
  res.status(201).json(employee)
})
