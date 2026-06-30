import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEmployeeById } from "./hooks/use-employees"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorState } from "@/components/common/error-state"

export function EmployeeDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    data: employee,
    isLoading,
    isError,
    refetch: refetchEmployee,
  } = useEmployeeById(id)

  if (isLoading) {
    return <LoadingState message="Đang tải..." />
  }

  if (isError || !employee) {
    return (
      <ErrorState message="Lỗi khi tải dữ liệu" onRetry={refetchEmployee} />
    )
  }

  const handleReturn = () => {
    navigate(-1)
  }
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <Link to="/admin">
          <Button variant="outline" onClick={handleReturn}>
            ← Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee Detail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <strong>ID:</strong> {employee.id}
          </div>
          <div>
            <strong>Full Name:</strong> {employee.name}
          </div>
          <div>
            <strong>Email:</strong> {employee.email}
          </div>
          <div>
            <strong>Position:</strong> {employee.position}
          </div>
          <div>
            <strong>Department:</strong> {employee.department}
          </div>
          <div>
            <strong>Status:</strong> {employee.status}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
