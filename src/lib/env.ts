const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"
if (!API_URL) {
  throw new Error("Error")
}

export const env = {
  API_URL,
}
