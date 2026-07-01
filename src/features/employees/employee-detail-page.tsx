import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEmployeeDetail } from "./hooks/use-employees"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorState } from "@/components/common/error-state"

export function EmployeeDetailPage() {
  const goTo = useNavigate()
  const { id } = useParams()
  const {
    data: employeeInfo,
    isLoading,
    isError,
    refetch: refetchEmployee,
  } = useEmployeeDetail(id)

  if (isLoading) {
    return <LoadingState statusMsg="Đang tải..." />
  }

  if (isError || !employeeInfo) {
    return (
      <ErrorState message="Lỗi khi tải dữ liệu" onRetry={refetchEmployee} />
    )
  }

  const goBack = () => {
    goTo(-1)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <Link to="/admin">
          <Button variant="outline" onClick={goBack}>
            ← Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <strong>ID:</strong> {employeeInfo.id}
            </div>
            <div>
              <strong>Full Name:</strong> {employeeInfo.name}
            </div>
            <div>
              <strong>Email:</strong> {employeeInfo.email}
            </div>
            <div>
              <strong>Position:</strong> {employeeInfo.position}
            </div>
            <div>
              <strong>Department:</strong> {employeeInfo.department}
            </div>
            <div>
              <strong>Status:</strong> {employeeInfo.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
