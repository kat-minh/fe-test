import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEmployees } from "@/hooks/useEmployees"
import { Employee } from "@/store/api/employee.api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function AdminPage() {
  const { data = [], isLoading, isError, refetch } = useEmployees()
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        <p>Có lỗi xảy ra</p>
        <Button size="sm" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    )
  }

  const filteredEmployees = data.filter((employee: Employee) => {
    const query = searchQuery.toLowerCase()
    return (
      employee.name?.toLowerCase().includes(query) ||
      employee.email?.toLowerCase().includes(query)
    )
  })
  return (
    <>
      <h1>AdminPage</h1>
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên nhân viên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee: Employee) => (
              <TableRow
                key={employee.id}
                onClick={() => navigate(`/admin/employees/${employee.id}`)}
              >
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      employee.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
