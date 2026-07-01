import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEmployeeSearch } from "../hooks/useEmployeeSearch"
import useEmployeeList from "../hooks/useEmployeeList"

const AdminPage = () => {
  const navigate = useNavigate()
  const { data: employees, isLoading, isError } = useEmployeeList()
  const { search, setSearch, filtered } = useEmployeeSearch(employees)
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-between">
        <p className="text-muted-foreground">
          Loading information employees ...{" "}
        </p>
      </div>
    )
  }
  if (isError || !employees) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Cannot load employees !</p>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">List Employees</h1>
        <Button onClick={() => navigate("/admin/employees/create")}>
          Create
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Find by name, email, position, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Cannot find employee {search}
                </TableCell>
              </TableRow>
            ) : (
              filtered?.map((e) => (
                <TableRow>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.position}</TableCell>
                  <TableCell>{e.department}</TableCell>
                  <TableCell>{e.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminPage
