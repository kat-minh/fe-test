import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetEmployee } from "@/features/employee/hooks/use-get-employee"

export default function EmployeeDetail() {
  const { data } = useGetEmployee()
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
