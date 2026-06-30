import { CreateEmployee, Employee } from './type';
import { api } from "@/lib/axios"

export const adminApi = {

  async create(cre: CreateEmployee): Promise<void> {
    await api.post("/employees", cre);
  },

  async getEmployee(): Promise<Employee[]> {
    return await api.get("/employees");
  },

  async getEmployeeById(id: string): Promise<Employee> {
    return await api.get(`/employees/${id}`)
  }
}