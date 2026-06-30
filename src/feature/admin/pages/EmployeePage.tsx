import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEmployee } from "../hooks/useEmployee"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function Employee() {
  const { id } = useParams()

  const { data: userData, isLoading, isError, error, refetch } = useEmployee(id)
  const navigate = useNavigate()
  if (isLoading) return <p>Đang loaing</p>

  if (isError)
    return (
      <>
        <div>{error.message}</div>
        <Button onClick={() => refetch()}>Thử lại</Button>
      </>
    )

  if (!userData) return <p>Data is rỗng</p>

  const handleBack = () => {
    console.log("Hello")

    navigate("/admin", { replace: true })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Create at</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{userData.id}</TableCell>
            <TableCell>{userData.name}</TableCell>
            <TableCell>{userData.email}</TableCell>
            <TableCell>{userData.position}</TableCell>
            <TableCell>{userData.department}</TableCell>
            <TableCell>{userData.status}</TableCell>
            <TableCell>{userData.createdAt}</TableCell>
            <TableCell>
              <Button onClick={() => handleBack()}>Trở lại danh sách</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default Employee
