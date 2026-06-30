import { Employee } from "@/lib/apiClient"
import { useState } from "react"

const useList = (employees: Employee[]) => {
  const [search, setSearch] = useState("")
  const filtered = employees

  return { search, setSearch, filtered }
}

export default useList
