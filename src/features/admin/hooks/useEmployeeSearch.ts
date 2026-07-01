import { Employee } from "@/lib/apiClient"
import { useMemo, useState } from "react"

export const useEmployeeSearch = (employees: Employee[] | undefined) => {
  const [search, setSearch] = useState("")
  const filtered = useMemo(() => {
    if (!employees) return []
    if (!search.trim()) return employees
    const keyword = search.toLowerCase().trim()
    return employees.filter((e) =>
      [e.name, e.email, e.position, e.department]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    )
  }, [employees, search])
  return { search, setSearch, filtered }
}
