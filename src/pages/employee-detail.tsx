import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetEmployee } from "@/features/employee/hooks/use-get-employee"
import { useParams } from "react-router-dom"

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetEmployee(id!)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee infor</CardTitle>
        </CardHeader>
        <CardContent>{data?.id}</CardContent>
        <CardContent>{data?.name}</CardContent>
        <CardContent>{data?.position}</CardContent>
        <CardContent>{data?.department}</CardContent>
      </Card>
    </>
  )
}
