import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useEmployeesQuery,
  useLogoutMutation,
} from "@/components/hooks/useAuth"

export default function AdminPage() {
  const navigate = useNavigate()
  const logoutMutation = useLogoutMutation()
  const [search, setSearch] = useState("")

  const { data, isLoading, isError, refetch } = useEmployeesQuery()

  const filteredData = data?.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách Employee</h1>
        <div className="space-x-2">
          <Button onClick={() => navigate("/admin/employees/create")}>
            Tạo Employee mới
          </Button>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            Đăng xuất
          </Button>
        </div>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && <p>Đang tải dữ liệu...</p>}
      {isError && (
        <div className="text-red-500">
          Có lỗi xảy ra.{" "}
          <Button variant="link" onClick={() => refetch()}>
            Thử lại
          </Button>
        </div>
      )}

      {!isLoading && !isError && filteredData?.length === 0 && (
        <p>Không có dữ liệu.</p>
      )}

      {!isLoading && !isError && filteredData && filteredData.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Chức vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((emp) => (
              <TableRow
                key={emp.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/admin/employees/${emp.id}`)}
              >
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
