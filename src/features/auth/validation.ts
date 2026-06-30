import {z} from "zod"
export const LoginSchema = z.object({
    email: z.string().email({message: "Email khoog đúng định dạng"}),
    password: z.string().min(6,{message: "Mật khẩu ít nhất 6 kí tự"})
})

export type LoginValidation = z.infer<typeof LoginSchema>