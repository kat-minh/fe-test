import { Button } from "@/components/ui/button"
import { useEmmployeeDetail } from "@/hooks/useEmployeeDetail"
import { useNavigate, useParams } from "react-router-dom"

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: employee, isLoading, isError } = useEmmployeeDetail(id)

  if (isLoading) {
    return <div>Đang tải thông tin...</div>
  }

  if (isError || !employee) {
    return (
      <div className="space-y-4 p-6 max-w-md mx-auto text-center">
        <p>Không tìm thấy nhân viên hoặc đang có lỗi!</p>
        <Button onClick={() => navigate("/admin")}>
          Quay lại trang quản lý
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/admin")}>
        Quay lại danh sách
      </Button>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
        <div>
          <h1>{employee.name}</h1>
          <p>Mã nhân viên: {employee.id}</p>
        </div>

        <div>
          <div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Chức vụ
              </p>
              <p className="font-medium">{employee.position}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Phòng ban
              </p>
              <p className="font-medium">{employee.department}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            Trạng thái: {employee.status}
          </div>
        </div>
      </div>
    </div>
  )
}
