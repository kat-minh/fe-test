import { useParams, Link } from "react-router-dom"
import { useEmployeeDetail } from "../hook/useEmployee"
import { Button } from "@/shared/components/ui/button"

const DetailedEmployee = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useEmployeeDetail(id as string)

  if (isLoading) return <div>Đang tải chi tiết...</div>
  if (isError) return <div>Lỗi khi tải chi tiết</div>
  if (!data) return <div>Không tìm thấy dữ liệu</div>

  return (
    <>
      <h2>Chi tiết nhân viên</h2>
      <Link to="/admin">
        <Button>Quay lại danh sách</Button>
      </Link>

      <div>
        <p>ID: {data.id}</p>
        <p>Họ tên: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Chức vụ: {data.position}</p>
        <p>Phòng ban: {data.department}</p>
        <p>Trạng thái: {data.status}</p>
        <p>Ngày tạo: {data.createdAt}</p>
      </div>
    </>
  )
}

export default DetailedEmployee
