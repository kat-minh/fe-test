import { useState } from "react"
import { useGetEmployee } from "../hooks/useGetEmployee"

function AdminPage() {
  const { data } = useGetEmployee()

  if (data) {
    console.log(data)
  }

  return <></>
}

export default AdminPage
