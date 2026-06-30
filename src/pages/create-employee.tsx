import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateEmployee } from "@/features/admin/hooks/use-create-employee"
import { EmployeeRequest } from "@/features/admin/types"
import { EmployeeSchema, EmployeeValidation } from "@/features/admin/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export function CreateEmployee(){

    const createEmployee = useCreateEmployee()

    const navigate = useNavigate()

    // const onSubmit = (payload: EmployeeRequest) => {
    //     createEmployee.mutate(payload)
    // }

    // const{
    //     register: create,
    //     handleSubmit,
    //     formState: {
    //         errors
    //     }
    // } = useForm<EmployeeValidation>({
    //     mode: "onTouched",
    //     resolver: zodResolver(EmployeeSchema)
    // })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("")
    const [department, setDepartment] = useState("")
    const [status, setStatus] = useState("active")

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        const payload = {name, email, position, department, status}
        
        createEmployee.mutate(payload, {
            onSuccess: () => {
                setName("")
                setEmail("")
                setPosition("")
                setDepartment("")
                setStatus("active")
                navigate("/admin")
            },
            onError: () => {
                alert("Tạo thất bại")
            }
        })

    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>

                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>

                <Label htmlFor="position">Position</Label>
                <Input type="text" id="position" value={position} onChange={e => setPosition(e.target.value)}/>

                <Label htmlFor="department">Department</Label>
                <Input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)}/>

                <Button type="submit">Thêm</Button>

            </form>
        </div>
    )
}