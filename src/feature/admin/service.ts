import { api } from "@/lib/axios"
import { CreateEmployee, Employee } from "./type"
import { User } from "@/type";

export const employeeApi = {

  async create(cre: CreateEmployee): Promise<void> {
    await api.post("/employees", cre);
  },

  async getEmployee(): Promise<Employee[]> {
    return await api.get("/employees");
  }
}