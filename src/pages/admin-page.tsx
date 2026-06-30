import { Button } from "@/components/ui/button"
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetEmployee } from "@/features/employee/hooks/use-get-employee"
import { useGetEmployees } from "@/features/employee/hooks/use-get-employees"
import { useNavigate } from "react-router-dom"

export default function Admin() {
  const navigate = useNavigate()
  const getDetail = useGetEmployee
  const { data: employees } = useGetEmployees()
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {employees?.map((emp) => (
          <TableRow>
            <TableCell>{emp.id}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.email}</TableCell>

            <TableCell>{emp.position}</TableCell>

            <TableCell>{emp.department}</TableCell>
            <TableCell>{emp.status}</TableCell>
            <TableCell>
              <Button onClick={() => navigate(`/admin/employees/${emp.id}`)}>
                View Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Button onClick={() => navigate("/admin/employees/create")}>
        Add Employee
      </Button>
    </>
  )
}
