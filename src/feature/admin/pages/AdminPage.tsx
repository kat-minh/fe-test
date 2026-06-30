import { Button } from "@/components/ui/button"
import { useGetAllEmployee } from "../hooks/useGetEmployee"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { replace, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { useState } from "react"

function AdminPage() {
  const {
    data: employeeData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllEmployee()

  const navigate = useNavigate()
  const handlEmployeeById = (id: string) => {
    navigate(`employees/${id}`)
  }

  // const [filerData, setFilerData] = useState([]);
  const [search, setSearch] = useState("")
  const [searchValue, setSearchValue] = useState("")

  if (isLoading) return <p>Đang loading....</p>

  if (isError)
    return (
      <>
        <div>{error.message}</div>
        <Button onClick={() => refetch()}>Thử lại</Button>
      </>
    )

  if (!employeeData) return <p>Data rỗng</p>

  const filerSeachData = employeeData.filter((employee) => {
    if (searchValue === "") {
      return employee
    }
    if (searchValue === "name") {
      return employee.name
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim())
    }
    if (searchValue === "email") {
      return employee.email
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim())
    }
    if (searchValue === "position") {
      return employee.position
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim())
    }
    if (searchValue === "department") {
      return employee.department
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim())
    }
  })

  return (
    <>
      <Input
        id="search"
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Input
        id="searchValue"
        type="text"
        placeholder="searchValue"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

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
          {filerSeachData?.map((s) => (
            <TableRow>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.position}</TableCell>
              <TableCell>{s.department}</TableCell>
              <TableCell>{s.status}</TableCell>
              <TableCell>{s.createdAt}</TableCell>
              <TableCell>
                <Button onClick={() => handlEmployeeById(s.id)}>
                  Nút redirect
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AdminPage
