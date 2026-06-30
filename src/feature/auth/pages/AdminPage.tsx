import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/common/StatusStates"
import { useLogoutMutation, useUser } from "../hook/useAuth"
import { LogOut } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEmployeesList } from "@/feature/employee/hook/useEmployee"

// Import shadcn Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

const AdminPage = () => {
  const [search, setSearch] = useState("")
  const logoutMutation = useLogoutMutation()

  const {
    data: user,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = useUser()

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
    refetch: refetchEmployees,
  } = useEmployeesList(search)

  const onSubmit = async () => {
    logoutMutation.mutate()
  }

  if (isUserLoading) return <LoadingState />
  if (isUserError) {
    return (
      <ErrorState
        message={userError?.message || "Failed to load profile"}
        onRetry={() => refetchUser()}
      />
    )
  }

  if (!user) return <EmptyState message="Không tìm thấy user" />

  return (
    <>
      <div>GET ME</div>
      <h1>{user?.user?.name}</h1>
      <p>{user?.user?.id}</p>
      <p>{user?.user?.email}</p>
      <p>{user?.user?.role}</p>

      <Button disabled={logoutMutation.isPending} onClick={onSubmit}>
        <LogOut />
        {logoutMutation.isPending ? "Đang đăng xuất..." : "Logout"}
      </Button>

      <br />
      <h2>Danh sách nhân viên</h2>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/admin/employees/create">
          <Button>+ Tạo nhân viên</Button>
        </Link>
      </div>

      {isEmployeesError && (
        <div>
          Lỗi tải dữ liệu!{" "}
          <Button onClick={() => refetchEmployees()}>Thử lại</Button>
        </div>
      )}

      {!isEmployeesLoading && !isEmployeesError && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.length === 0 ? (
              <TableRow>
                <TableCell>Không có dữ liệu</TableCell>
              </TableRow>
            ) : (
              employees?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Link to={`/admin/employees/${item.id}`}>
                      <Button>Xem chi tiết</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default AdminPage
