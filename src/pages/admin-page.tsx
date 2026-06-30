import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllEmployees } from "@/features/admin/hooks/use-get-employees";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout";
import { useNavigate } from "react-router-dom";

export function AdminPage(){

    const navigate = useNavigate()

    const logoutMutation = useLogoutMutation()

    const onSubmit = () => {
        logoutMutation.mutate()
    }

    const useGetAllEmp = useGetAllEmployees()

    const{
        data: employees,
        isError,
        error,
    } = useGetAllEmp

    if(isError){
        return(
            <div>Lỗi rồi. {error.message}</div>
        )
    }

    return(
        <div>
            <div className="flex items-center justify-between mx-2">
                <div className="text-2xl">Admin</div>
                <div className="w-95 flex justify-between my-2">
                    <Button onClick={() => navigate("employees/create")}> Thêm mới</Button>
                    <Button>Làm mới</Button>
                    <Button onClick={onSubmit}>Đăng xuất</Button>
                </div>
                
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Chi tiết</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(employees)?.map(employee => (
                            <TableRow className="">
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <Button onClick={() => navigate(`/employees/${employee.id}`)}>Xem</Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}