import { useNavigate, useParams } from "react-router-dom"
import { useEmployee } from "../hooks/useEmployees"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  on_leave: "secondary",
  inactive: "destructive",
}

const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: employee, isLoading, isError } = useEmployee(id!)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading employee details...</p>
      </div>
    )
  }

  if (isError || !employee) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Cannot load employee details.</p>
        <Button variant="outline" onClick={() => navigate("/admin")}>
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{employee.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="font-medium">{employee.position}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariant[employee.status] || "default"}>
                {employee.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeDetailPage
