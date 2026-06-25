# Đề bài — FE Test ReactJS

## 1. Giới thiệu

Đây là một dự án nền đã được cấu hình sẵn toàn bộ hạ tầng: build, routing, HTTP client, state management, form và validation.

Phần logic tính năng chưa được viết. Nhiệm vụ của bạn là hoàn thiện các chức năng được mô tả bên dưới dựa trên convention có sẵn của dự án.

Mục tiêu của bài test là đánh giá khả năng:

- Đọc hiểu một codebase có sẵn.
- Xây dựng tính năng ReactJS kết nối với API thật.
- Tổ chức code rõ ràng, tách biệt giữa component / hook / service / store.
- Xử lý authentication, authorization theo role.
- Xử lý đầy đủ các trạng thái loading / error / empty.
- Validate form bằng React Hook Form + Zod.
- Sử dụng TanStack React Query đúng cách cho server state.

Bạn được cung cấp một API backend riêng. Cấu hình endpoint thông qua biến môi trường:

env
VITE_API_BASE_URL=

---

## 2. Tech stack đã cài sẵn

| Mảng         | Thư viện                     |
| ------------ | ---------------------------- |
| Build / dev  | Vite + React 18 + TypeScript |
| Styling / UI | Tailwind CSS v4 + shadcn/ui  |
| Routing      | React Router v7              |
| HTTP         | Axios — src/lib/axios.ts     |
| Server state | TanStack React Query         |
| Client state | Zustand — src/store          |
| Form         | React Hook Form              |
| Validation   | Zod + @hookform/resolvers    |

---

## 3. Cách bắt đầu

### Cách nhanh nhất (chạy cả backend + frontend bằng 1 lệnh)

Repo đã kèm sẵn backend tham chiếu trong thư mục `server/`. Mở **PowerShell** tại thư mục gốc của project rồi chạy:

powershell
.\dev.cmd

Lần đầu sẽ tự cài dependencies, sau đó bật cùng lúc:

- Backend: http://localhost:4000 (Swagger: /docs)
- Frontend: http://localhost:5173

Nhấn `Ctrl + C` để tắt cả hai. Tài khoản đăng nhập:

- admin@example.com / admin123 (admin)
- employee@example.com / employee123 (employee)

### Hoặc chạy thủ công

pnpm install
cp .env.example .env
pnpm dev

`VITE_API_BASE_URL` mặc định trỏ về backend local (http://localhost:4000); chỉnh lại trong `.env` nếu bạn dùng API khác.

Các script khác:

pnpm build # type-check + build production, bắt buộc phải pass
pnpm preview # xem thử bản build
pnpm format # format code

Code tính năng nên được đặt trong:

txt
src/features/

Có thể tham khảo src/pages/home-page.tsx như một route mẫu.

---

## 4. Route yêu cầu

Ứng dụng cần có các route sau:

| Path                    | Mô tả                                             | Quyền truy cập    |
| ----------------------- | ------------------------------------------------- | ----------------- |
| /                       | Home page, chỉ cần hiển thị chữ “Homepage”        | Public            |
| /login                  | Trang đăng nhập                                   | Chỉ guest         |
| /attendance             | Trang chấm công, chỉ cần hiển thị chữ “Chấm công” | Chỉ role employee |
| /admin                  | Trang admin, hiển thị danh sách employee          | Chỉ role admin    |
| /admin/employees/create | Trang tạo employee                                | Chỉ role admin    |
| /admin/employees/:id    | Trang chi tiết employee                           | Chỉ role admin    |

Quy tắc redirect:

- Người chưa đăng nhập truy cập route protected → redirect về /login.
- Người đã đăng nhập truy cập /login → redirect theo role:

  - admin → /admin
  - employee → /attendance

- User role employee truy cập route admin → redirect về /attendance.
- User role admin truy cập route employee → redirect về /admin.

---

## 5. Yêu cầu chức năng

### 5.1. Đăng nhập — bắt buộc

Xây dựng form đăng nhập gồm:

- Email
- Mật khẩu

Yêu cầu:

- Validate form bằng React Hook Form + Zod.
- Email phải đúng định dạng email.
- Mật khẩu không được để trống.
- Gọi API đăng nhập.
- Khi đăng nhập thành công:

  - Lưu token vào Zustand store.
  - Lưu thông tin user vào Zustand store.
  - Redirect theo role:

    - admin → /admin
    - employee → /attendance

- Khi đăng nhập thất bại:

  - Hiển thị lỗi cho người dùng.

Giả định API login trả về dữ liệu dạng tương tự:

{
token: string;
user: {
id: string;
email: string;
fullName: string;
role: "admin" | "employee";
};
}

---

### 5.2. Đăng xuất — bắt buộc

Xây dựng chức năng logout.

Yêu cầu:

- Xóa token.
- Xóa thông tin user trong store.
- Redirect về /login.

---

### 5.3. Bảo vệ route theo role — bắt buộc

Cần xây dựng cơ chế bảo vệ route.

Yêu cầu:

- Route public: /
- Route chỉ dành cho guest: /login
- Route chỉ dành cho employee: /attendance
- Route chỉ dành cho admin: /admin, /admin/employees/create, /admin/employees/:id

Có thể triển khai bằng component wrapper, loader hoặc cơ chế phù hợp với React Router.

---

### 5.4. Danh sách employee dạng bảng — bắt buộc

Trang /admin cần hiển thị danh sách employee.

Yêu cầu:

- Lấy dữ liệu từ API bằng TanStack React Query.
- Hiển thị dữ liệu bằng shadcn/ui Table.
- Có các trạng thái:

  - Loading
  - Error, có nút “Thử lại”
  - Empty khi không có dữ liệu

- Có ô tìm kiếm để lọc employee trên bảng.
- Tìm kiếm thực hiện ở client-side trên danh sách đã tải.
- Click vào một dòng employee → chuyển sang trang chi tiết /admin/employees/:id.

---

### 5.5. Xem chi tiết employee — bắt buộc

Trang /admin/employees/:id hiển thị thông tin chi tiết của một employee.

Yêu cầu:

- Lấy dữ liệu chi tiết từ API bằng React Query.
- Route lấy id từ URL params.
- Có trạng thái loading.
- Có trạng thái error.
- Có nút quay lại danh sách.

---

### 5.6. Tạo mới employee — bắt buộc

Trang /admin/employees/create dùng để tạo employee mới.

Form tối thiểu gồm:

- Full name
- Email
- Phone number
- Position

Yêu cầu:

- Validate form bằng React Hook Form + Zod.
- Email đúng định dạng.
- Full name không được để trống.
- Gọi API tạo employee.
- Khi tạo thành công:

  - Invalidate query danh sách employee.
  - Hiển thị thông báo thành công.
  - Điều hướng về /admin.

- Khi tạo thất bại:

  - Hiển thị lỗi cho người dùng.

---
