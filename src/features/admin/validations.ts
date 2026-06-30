import z from "zod";
import { LoginSchema } from "../auth/validation";

export const EmployeeSchema = z.object({
    email: z.string().email(),
    fullname: z.string().min(1, {message: "Tên không được để trống"}),
    position: z.string(),
    department: z.string(),
    status: z.string()
})

export type EmployeeValidation = z.infer<typeof LoginSchema>