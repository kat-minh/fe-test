import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useGetDetailEmployee } from "@/features/admin/hooks/use-get-detail-employee"
import { useParams } from "react-router-dom"

export function DetailPage(){
    
    const {id} = useParams<{id: string}>()
    const detailEmployee = useGetDetailEmployee(id)

    const{
        data: employee,
        isLoading,
        isError,
        error
    } = detailEmployee

    if(isLoading){
        return(
            <div>Đang tải dữ liệu</div>
        )
    }

    if(isError){
        return(
            <div>Đã xảy ra lỗi. {error.message}</div>
        )
    }

    return(
        <div className="h-screen flex items-center justify-center">
            <Card className="w-75">
                <CardHeader className="flex justify-center text-2xl">Thông tin chi tiết</CardHeader>
                <CardContent>ID: {employee?.id}</CardContent>
                <CardContent>Email: {employee?.email}</CardContent>
                <CardContent>Name: {employee?.name}</CardContent>
                <CardContent>Position: {employee?.position}</CardContent>
                <CardContent>Department: {employee?.department}</CardContent>
            </Card>
        </div>
    )
}