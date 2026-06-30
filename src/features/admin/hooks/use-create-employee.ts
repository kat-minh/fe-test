import { useMutation } from "@tanstack/react-query"
import { adminSerivce } from "../services"
import { EmployeeRequest } from "../types"
import { useNavigate } from "react-router-dom"

export const useCreateEmployee = () => {

    const navigate = useNavigate()

    return useMutation({
        mutationFn: (payload: EmployeeRequest) => adminSerivce.createEmployee(payload),
        onSuccess: () => {
            alert("Tạo nhân viên thành công")
            navigate("/admin")
        },
        onError: () => {
            alert("Tạo thất bại vui lòng thử lại")
        }
    })
}