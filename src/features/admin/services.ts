import { api } from "@/lib/axios";
import { EmployeeRequest, EmployeeResponse } from "./types";

export const adminSerivce = {
    getAllEmployees: async() : Promise<EmployeeResponse[]> => {
        const response = await api.get("/employees")
        return response.data
    },
    getEmployeeDetail: async(id: string) : Promise<EmployeeResponse> => {
        const response = await api.get(`/employees/${id}`)
        return response.data
    },
    createEmployee: async(payload: EmployeeRequest) : Promise<EmployeeResponse> => {
        const response = await api.post("/employees/", payload)
        return response.data
    }
}