import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/components/services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiClient.getEmpById(id as string),
    enabled: !!id,
  })

  if (isLoading) return <div className="p-8">Đang tải thông tin...</div>
  if (isError || !employee)
    return (
      <div className="p-8 text-red-500">Lỗi khi tải thông tin nhân viên.</div>
    )

  return (
    <div className="p-8">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => navigate("/admin")}
      >
        &larr; Quay lại danh sách
      </Button>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Chi tiết Employee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>ID:</strong> {employee.id}
          </p>
          <p>
            <strong>Họ tên:</strong> {employee.name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Chức vụ:</strong> {employee.position}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
