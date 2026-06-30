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
import { useEmployees } from "./hooks/use-employees"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function EmployeeListPage() {
  const navigate = useNavigate()
  const {
    data: employees,
    isLoading,
    isFetching,
    isError,
    refetch: refectchEmployee,
  } = useEmployees()

  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees =
    employees?.filter((employee) =>
      [employee.name, employee.email, employee.position, employee.department]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ) || []

  const handleDetail = (id: string | null) => {
    navigate(`/admin/employees/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
        <Input
          placeholder="Search employees..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/admin/employees/create">
          <Button>Add New</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
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
              {filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="cursor-pointer transition"
                  onClick={() => handleDetail(employee.id)}
                >
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>
                    <Link to={`/admin/employees/${employee.id}`}>
                      <Button variant="outline" size="sm" className="mr-2">
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
