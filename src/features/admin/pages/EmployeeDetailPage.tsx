import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEmployee } from "../hooks/useEmployees"
import { Button } from "@/components/ui/button"
import { useEmployeeSearch } from "../hooks/useEmployeeSearch"

const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: employees, isLoading, isError } = useEmployee(id!)
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-between">
        <p className="text-muted-foreground">
          Loading information employees ...{" "}
        </p>
      </div>
    )
  }
  if (isError || !employees) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Cannot load employees !</p>
        <Button variant="outline" onClick={() => navigate("/admin")}>
          Back
        </Button>
      </div>
    )
  }
  return <div>EmployeeDetailPage</div>
}

export default EmployeeDetailPage
