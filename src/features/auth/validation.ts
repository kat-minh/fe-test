import z from "zod"

export const LoginScheme = Object.create({
    email: z.string().email({message: "Email phải đúng định dạng"}),
    password: z.string().min(6,{message:"Email phải chứa ít nhất 6 kí tự"})
})

