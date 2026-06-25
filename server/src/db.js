import bcrypt from "bcryptjs"

/**
 * In-memory data store. Everything lives in plain arrays and resets every time
 * the server restarts — perfect for a test backend (clean, predictable state,
 * no database to install).
 */

let userSeq = 0
let employeeSeq = 0

const nextUserId = () => `u${++userSeq}`
const nextEmployeeId = () => `e${++employeeSeq}`

/** Seeded login accounts (no public registration in this build). */
export const users = [
  {
    id: nextUserId(),
    email: "admin@example.com",
    name: "Admin",
    role: "admin",
    // bcrypt hash of "admin123"
    passwordHash: bcrypt.hashSync("admin123", 8),
  },
  {
    id: nextUserId(),
    email: "employee@example.com",
    name: "Employee",
    role: "employee",
    // bcrypt hash of "employee123"
    passwordHash: bcrypt.hashSync("employee123", 8),
  },
]

const seedEmployees = [
  ["An Nguyen", "an.nguyen@example.com", "Frontend Engineer", "Engineering", "active"],
  ["Binh Tran", "binh.tran@example.com", "Backend Engineer", "Engineering", "active"],
  ["Chi Le", "chi.le@example.com", "Product Designer", "Design", "active"],
  ["Dung Pham", "dung.pham@example.com", "QA Engineer", "Engineering", "on_leave"],
  ["Hoa Vo", "hoa.vo@example.com", "HR Specialist", "People", "active"],
  ["Khanh Do", "khanh.do@example.com", "DevOps Engineer", "Engineering", "active"],
  ["Lan Hoang", "lan.hoang@example.com", "Marketing Lead", "Marketing", "active"],
  ["Minh Bui", "minh.bui@example.com", "Data Analyst", "Data", "active"],
  ["Nga Dang", "nga.dang@example.com", "Accountant", "Finance", "inactive"],
  ["Phuc Ly", "phuc.ly@example.com", "Sales Executive", "Sales", "active"],
  ["Quan Vu", "quan.vu@example.com", "Mobile Engineer", "Engineering", "active"],
  ["Thu Ngo", "thu.ngo@example.com", "Customer Support", "Support", "active"],
]

export const employees = seedEmployees.map(
  ([name, email, position, department, status]) => ({
    id: nextEmployeeId(),
    name,
    email,
    position,
    department,
    status,
    createdAt: new Date().toISOString(),
  }),
)

export function findUserByEmail(email) {
  const target = String(email).toLowerCase()
  return users.find((u) => u.email.toLowerCase() === target)
}

export function findUserById(id) {
  return users.find((u) => u.id === id)
}

/** Strip the password hash before sending a user over the wire. */
export function publicUser(user) {
  if (!user) return null
  const { passwordHash, ...rest } = user
  return rest
}

export function findEmployeeById(id) {
  return employees.find((e) => e.id === id)
}

export function createEmployee(data) {
  const employee = {
    id: nextEmployeeId(),
    name: data.name,
    email: data.email,
    position: data.position,
    department: data.department,
    status: data.status ?? "active",
    createdAt: new Date().toISOString(),
  }
  employees.push(employee)
  return employee
}
