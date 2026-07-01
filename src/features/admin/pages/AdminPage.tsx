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
  const { data: employees, isLoading, isError, refetch } = useEmployeeList()
  const { search, setSearch, filtered } = useEmployeeSearch(employees)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading employees...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Cannot load employees.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <Button onClick={() => navigate("/admin/employees/create")}>
          Create
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search by name, email, position, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {search
                    ? `No employees matching "${search}"`
                    : "No employees found."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((e) => (
                <TableRow
                  key={e.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/admin/employees/${e.id}`)}
                >
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
