import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useEmployeeList } from "./hooks/use-employees"
import { useState } from "react"

export function EmployeeListPage() {
  const goTo = useNavigate()
  const {
    data: employeeData,
  } = useEmployeeList()

  const [searchQuery, setSearchQuery] = useState("")

  const searchedEmployees =
    employeeData?.filter((emp) =>
      [emp.name, emp.email, emp.position, emp.department]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || []

  const viewEmployeeDetail = (id: string | null) => {
    goTo(`/admin/employees/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/admin/employees/create">
          <Button>Add New</Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchedEmployees.map((emp) => (
                <TableRow
                  key={emp.id}
                  onClick={() => viewEmployeeDetail(emp.id)}
                >
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell>
                    <Link to={`/admin/employees/${emp.id}`}>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
