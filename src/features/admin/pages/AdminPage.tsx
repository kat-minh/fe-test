import React from "react"
import { useEmployees } from "../hooks/useEmployees"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useList from "../hooks/useList"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const AdminPage = () => {
  const { data: employees, isError, refetch } = useEmployees()
  const { search, setSearch, filtered } = useList(employees)
  return (
    <div className="px-4">
      <div className="w-md flex items-center">
        <Input
          type="text"
          placeholder="Enter email/name/position/"
          className="mx-4"
        />
        <Button type="button">Find</Button>
      </div>

      <Table>
        <TableHeader className="">
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
        </TableHeader>

        <TableBody>
          {employees?.map((e) => (
            <TableRow>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.position}</TableCell>
              <TableCell>{e.department}</TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminPage
