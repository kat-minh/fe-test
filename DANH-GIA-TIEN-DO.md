# 📊 Đánh Giá Tiến Độ & Hướng Dẫn Hoàn Thiện

> **Dành cho**: Người mới học React, có background Java  
> **Ngày đánh giá**: 30/06/2026

---

## 🎯 Tổng Quan Tiến Độ

| Phần | Trạng Thái | % |
|------|-----------|-----|
| 5.1 Đăng nhập | ⚠️ Cơ bản xong, còn lỗi | 70% |
| 5.2 Đăng xuất | ⚠️ Cơ bản xong, còn lỗi | 80% |
| 5.3 Bảo vệ route | ⚠️ Thiếu role guard, thiếu route | 40% |
| 5.4 Danh sách employee | ⚠️ Khung đã có, thiếu nhiều | 30% |
| 5.5 Chi tiết employee | ❌ Chưa làm | 0% |
| 5.6 Tạo employee | ❌ Chưa làm | 0% |

**Tổng thể: ~35-40%**

---

## 🔍 Phân Tích Chi Tiết Từng Yêu Cầu

### 5.1 ĐĂNG NHẬP (70% - Còn 3 lỗi)

| Yêu cầu | Code hiện tại | Đánh giá |
|----------|---------------|----------|
| Form email + password | `LoginPage.tsx` có form đầy đủ | ✅ OK |
| Validate bằng RHF + Zod | `LoginSchema` trong `type.ts` | ✅ OK |
| Email đúng định dạng | `.email()` trong Zod | ✅ OK |
| Mật khẩu không trống | `.min(1)` trong Zod | ✅ OK |
| Gọi API đăng nhập | `useLogin.ts` gọi `apiClient.login()` | ✅ OK |
| Lưu token vào Zustand | `setToken(res.token)` | ✅ OK |
| Lưu user vào Zustand | `setUser(res.user)` | ✅ OK |
| **Redirect theo role** | `navigate(redirect \|\| "/")` | ❌ **BUG**: Luôn redirect về `/`, không kiểm tra role! |
| **Hiển thị lỗi** | `alert(...)` | ⚠️ **CẦN SỬA**: Dùng toast/sonner thay vì alert |
| **Xử lý loading** | `isPending` check trong button | ✅ OK |

#### 🐛 Bug #1: Redirect sau login không theo role

File `src/features/auth/hooks/useLogin.ts` dòng 20:
```typescript
// HIỆN TẠI (sai):
navigate(redirect || "/", { replace: true })

// PHẢI SỬA thành:
if (res.user.role === "admin") {
  navigate("/admin", { replace: true })
} else {
  navigate("/attendance", { replace: true })
}
```

#### 🐛 Bug #2: AuthUser field name không khớp API

File `src/store/auth-store.ts` dòng 19: `AuthUser` có field `name`, nhưng API trả về `fullName`.  
File `src/lib/apiClient.tsx` dòng 6: `user: AuthUser | string` — kiểu union này rất lỏng lẻo.

**Cần thống nhất**: Dùng `fullName` như API, hoặc map trong `apiClient.login()`.

#### ⚠️ Vấn đề #3: Dùng `alert()` thay vì toast

Hiện tại dùng `alert("Login successful !")`. Nên dùng thư viện toast như `sonner` (đã có sẵn trong shadcn/ui ecosystem).

---

### 5.2 ĐĂNG XUẤT (80% - Còn 1 lỗi)

| Yêu cầu | Code hiện tại | Đánh giá |
|----------|---------------|----------|
| Xóa token | `logout()` trong store | ✅ OK |
| Xóa user | `logout()` trong store | ✅ OK |
| **Redirect về /login** | `navigate("/")` | ❌ **BUG**: Phải redirect về `/login`! |

#### 🐛 Bug: File `src/features/auth/hooks/useLogout.ts` dòng 17:
```typescript
// HIỆN TẠI (sai):
navigate("/", { replace: true })

// PHẢI SỬA thành:
navigate("/login", { replace: true })
```

---

### 5.3 BẢO VỆ ROUTE (40% - Thiếu nhiều)

| Route | Trạng thái |
|-------|------------|
| `/` | ✅ Public, hoạt động |
| `/login` | ✅ GuestGuard chặn nếu đã login |
| `/attendance` | ❌ **Chưa có route và chưa có page** |
| `/admin` | ⚠️ Chỉ kiểm tra token, **không kiểm tra role** |
| `/admin/employees/create` | ❌ Chưa có |
| `/admin/employees/:id` | ❌ Chưa có |

#### 🐛 Bug #4: `GuardAuth` không kiểm tra role

File `src/shared/guard/GuardAuth.tsx`: Hiện tại CHỈ kiểm tra `token != null`.  
Employee có thể truy cập `/admin` — sai yêu cầu!

**Cách sửa**: Tạo component `RoleGuard` hoặc cho `GuardAuth` nhận prop `allowRole`.

#### ❌ Thiếu: Route `/attendance`
Cần tạo page `src/features/attendance/pages/AttendancePage.tsx` (chỉ hiển thị text "Chấm công").

#### ❌ Thiếu: Route `/admin/employees/create`
Cần tạo page `src/features/admin/pages/CreateEmployeePage.tsx`.

#### ❌ Thiếu: Route `/admin/employees/:id`
Cần tạo page `src/features/admin/pages/EmployeeDetailPage.tsx`.

---

### 5.4 DANH SÁCH EMPLOYEE (30% - Nhiều thiếu sót)

| Yêu cầu | Trạng thái | Ghi chú |
|----------|------------|---------|
| Fetch với React Query | ⚠️ Hook `useEmployees` có viết | Nhưng không dùng đúng cách |
| shadcn/ui Table | ⚠️ Có `<Table>` | Nhưng không có `<TableHead>` bọc ngoài |
| **Loading state** | ❌ | `employees` undefined → crash |
| **Error + Retry** | ❌ | `isError` destructured nhưng không render |
| **Empty state** | ❌ | Không kiểm tra mảng rỗng |
| Search client-side | ⚠️ | Hook `useList` có viết nhưng filter rỗng |
| Click row → detail | ❌ | Không có `Link`/`onClick` |

#### 🐛 Bug #5: AdminPage sẽ crash khi loading

File `src/features/admin/pages/AdminPage.tsx` dòng 39:
```typescript
// HIỆN TẠI: employees là undefined khi đang loading → crash
{employees?.map((e) => (...))}
```
Optional chaining `?.` chỉ bảo vệ `map` không chạy, nhưng không hiển thị loading.

#### 🐛 Bug #6: Search không hoạt động

File `src/features/admin/hooks/useList.ts`: `filtered` trả về `employees` nguyên bản, không thực hiện lọc gì cả.

#### 🐛 Bug #7: Table header sai cấu trúc

Dòng 30 của `AdminPage.tsx`: `<TableHeader>` dùng như `<thead>` nhưng component `TableHeader` là wrapper cho `<thead>`, thiếu `<TableRow>` + `<TableHead>` bên trong.

#### ❌ Thiếu: Xử lý 3 trạng thái (Loading / Error / Empty)

Pattern chuẩn React Query:
```tsx
if (isLoading) return <p>Đang tải...</p>
if (isError) return <p>Lỗi! <button onClick={() => refetch()}>Thử lại</button></p>
if (!data?.length) return <p>Không có dữ liệu</p>
// render table
```

---

### 5.5 CHI TIẾT EMPLOYEE (0% - Chưa làm)

Toàn bộ chưa có:
- ❌ Page `/admin/employees/:id`
- ❌ Hook `useEmployee(id)` gọi `GET /employees/:id`
- ❌ Route trong `router.tsx`
- ❌ Thêm `apiClient.getEmployeeDetail(id)` vào `apiClient.tsx`

---

### 5.6 TẠO EMPLOYEE (0% - Chưa làm)

Toàn bộ chưa có:
- ❌ Page `/admin/employees/create`
- ❌ Form (Full Name, Email, Phone, Position)
- ❌ Zod schema
- ❌ Hook `useCreateEmployee`
- ❌ Route trong `router.tsx`
- ❌ Thêm `apiClient.createEmployee(data)` vào `apiClient.tsx`

> ⚠️ **Lưu ý**: API server (`employees.routes.js`) yêu cầu fields: `name`, `email`, `position`, `department`, `status`.  
> KHÔNG có field `phone` như yêu cầu. Bạn cần quyết định: bỏ phone, hoặc thêm vào server.

---

## 🗺️ Lộ Trình Hoàn Thiện (Theo Thứ Tự)

### Bước 1: Sửa lỗi hiện có (30 phút)

Sửa các bug đã liệt kê ở trên trước khi làm tính năng mới:

| # | File | Việc cần làm |
|---|------|-------------|
| 1 | `useLogin.ts:20` | Redirect theo role |
| 2 | `useLogout.ts:17` | Redirect về `/login` |
| 3 | `GuardAuth.tsx` | Thêm kiểm tra allowRole |
| 4 | `auth-store.ts:19` | Đổi `name` → `fullName` |
| 5 | `apiClient.tsx:6` | Sửa type `AuthLogin.user` |

---

### Bước 2: Thêm route và guard (45 phút)

#### 2a. Tạo `RoleGuard` component mới

Tạo file `src/shared/guard/RoleGuard.tsx`:
```tsx
import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

const RoleGuard = ({ allowRole }: { allowRole: "admin" | "employee" }) => {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)

  if (!token) return <Navigate to="/login" replace />
  if (user?.role !== allowRole) {
    return <Navigate to={user?.role === "admin" ? "/admin" : "/attendance"} replace />
  }
  return <Outlet />
}

export default RoleGuard
```

#### 2b. Tạo page tạm cho Attendance

Tạo `src/features/attendance/pages/AttendancePage.tsx`:
```tsx
const AttendancePage = () => {
  return <p className="text-center text-xl mt-10">Chấm công</p>
}
export default AttendancePage
```

#### 2c. Tạo page tạm cho EmployeeDetail

Tạo `src/features/admin/pages/EmployeeDetailPage.tsx` (sẽ hoàn thiện sau).

#### 2d. Tạo page tạm cho CreateEmployee

Tạo `src/features/admin/pages/CreateEmployeePage.tsx` (sẽ hoàn thiện sau).

#### 2e. Cập nhật `router.tsx`:
```tsx
{
  element: <RoleGuard allowRole="employee" />,
  children: [{ path: "attendance", element: <AttendancePage /> }],
},
{
  element: <RoleGuard allowRole="admin" />,
  children: [
    { path: "admin", element: <AdminPage /> },
    { path: "admin/employees/create", element: <CreateEmployeePage /> },
    { path: "admin/employees/:id", element: <EmployeeDetailPage /> },
  ],
},
```

---

### Bước 3: Hoàn thiện AdminPage (60 phút)

#### 3a. Sửa `useList` hook để có search thực sự:
```typescript
const useList = (employees: Employee[] | undefined) => {
  const [search, setSearch] = useState("")

  const filtered = !employees ? [] : !search.trim()
    ? employees
    : employees.filter((e) =>
        [e.name, e.email, e.position, e.department]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )

  return { search, setSearch, filtered }
}
```

#### 3b. Sửa `AdminPage` thêm loading/error/empty/search/click:

Các trạng thái cần xử lý:
- **Loading**: Hiển thị "Đang tải..." khi `isLoading`
- **Error**: Hiển thị message lỗi + nút "Thử lại" gọi `refetch()`
- **Empty**: Khi `data` rỗng, hiển thị "Không có nhân viên nào"
- **Search**: Gắn `onChange` vào Input, dùng `filtered` thay vì `employees`
- **Click row**: Bọc `<TableRow>` trong `<Link>` hoặc `onClick` + `useNavigate`

---

### Bước 4: Hoàn thiện Employee Detail (45 phút)

#### 4a. Thêm vào `apiClient.tsx`:
```typescript
async getEmployeeDetail(id: string): Promise<Employee> {
  const res = await api.get(`/employees/${id}`)
  return res.data
}
```

#### 4b. Tạo hook `useEmployee.ts`:
```typescript
import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiClient.getEmployeeDetail(id),
    enabled: !!id, // chỉ fetch khi có id
  })
}
```

#### 4c. Hoàn thiện `EmployeeDetailPage.tsx`:
- Lấy `id` từ `useParams()`
- Fetch data bằng `useEmployee(id)`
- Xử lý Loading, Error
- Hiển thị Card với thông tin employee
- Nút "Quay lại" → `navigate("/admin")`

---

### Bước 5: Hoàn thiện Create Employee (60 phút)

#### 5a. Thêm vào `apiClient.tsx`:
```typescript
async createEmployee(data: {
  name: string
  email: string
  position: string
  department: string
  status?: string
}): Promise<Employee> {
  const res = await api.post("/employees", data)
  return res.data
}
```

#### 5b. Tạo Zod schema `src/features/admin/type.ts`:
```typescript
export const CreateEmployeeSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  position: z.string().min(1, "Vị trí không được để trống"),
  department: z.string().min(1, "Phòng ban không được để trống"),
  phone: z.string().optional(), // nếu muốn thêm phone (cần sửa server)
})
export type CreateEmployeeSchemaType = z.infer<typeof CreateEmployeeSchema>
```

#### 5c. Tạo hook `useCreateEmployee.ts`:
```typescript
import { apiClient } from "@/lib/apiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data) => apiClient.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      alert("Tạo nhân viên thành công!") // sau này thay bằng toast
      navigate("/admin")
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Tạo thất bại!")
    },
  })
}
```

#### 5d. Hoàn thiện `CreateEmployeePage.tsx`:
- Form với RHF + Zod
- Fields: name, email, phone (optional), position, department, status (select)
- Submit gọi `useCreateEmployee().mutate(data)`
- Nút "Quay lại" về `/admin`

---

## 📚 Góc Nhìn Java → React (Dành cho người mới)

### So sánh khái niệm

| Java / Spring | React | Giải thích |
|---------------|-------|------------|
| `@Service` | `src/features/*/hooks/use*.ts` | Business logic hooks |
| `@Repository` | `src/lib/apiClient.ts` | Gọi API |
| `@Controller` | `src/features/*/pages/*.tsx` | UI pages |
| `DTO class` | Zod schema + TypeScript `interface` | Validate + định nghĩa data shape |
| `@Transactional` | `useMutation` / `useQuery` (TanStack Query) | Quản lý server state |
| `SecurityFilterChain` | Guard components (`GuestGuard`, `RoleGuard`) | Bảo vệ route |
| `SecurityContextHolder` | Zustand `useAuthStore` | Lưu trạng thái auth toàn cục |
| `application.properties` | `.env` file | Cấu hình biến môi trường |
| `@Valid` | `zodResolver` + Zod | Validate form input |
| Thymeleaf / JSP | JSX (HTML trong JavaScript) | Render UI |
| `ModelAndView` | `useState` / `useForm` state | Quản lý state của component |

### Pattern quan trọng trong React cần nhớ

#### 1. React Query: 3 trạng thái bắt buộc phải xử lý

```tsx
const { data, isLoading, isError, error, refetch } = useQuery(...)

if (isLoading) return <LoadingSpinner />
if (isError) return <ErrorBox message={error.message} onRetry={refetch} />
if (!data?.length) return <EmptyState />

return <ActualData data={data} />
```

Tư duy Java: Đây giống như `try-catch-finally` trong controller — luôn phải xử lý đủ case.

#### 2. Mutation với React Query

```tsx
const mutation = useMutation({
  mutationFn: (data) => api.post("/endpoint", data),
  onSuccess: () => {
    // Giống @PostUpdate — invalidate cache để refresh list
    queryClient.invalidateQueries({ queryKey: ["employees"] })
  },
  onError: (error) => {
    // Xử lý lỗi như @ExceptionHandler
  },
})
```

#### 3. Guard trong React Router

Giống `SecurityFilterChain` trong Spring Security:
- `GuestGuard` = chỉ cho phép `anonymous()` (chưa login mới vào được `/login`)
- `RoleGuard` = `.hasRole("admin")` (chỉ admin mới vào `/admin`)

#### 4. Zod = Bean Validation

```typescript
// Zod (React)
const schema = z.object({
  email: z.string().email("Sai format email"),
  password: z.string().min(1, "Không được trống"),
})

// Tương đương Java:
// @Email(message = "Sai format email")
// @NotBlank(message = "Không được trống")
```

---

## 🛠️ Các API Endpoint Có Sẵn

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/auth/login` | Đăng nhập | Không |
| POST | `/auth/logout` | Đăng xuất (luôn 204) | Không |
| GET | `/auth/me` | Lấy user hiện tại | Có |
| GET | `/employees` | Danh sách employee (hỗ trợ `?search=`) | Có |
| GET | `/employees/:id` | Chi tiết employee | Có |
| POST | `/employees` | Tạo employee | Có |

### Data shape từ API:

**Login Response:**
```json
{
  "token": "eyJ...",
  "user": {
    "id": "u1",
    "email": "admin@example.com",
    "name": "Admin",
    "fullName": "Admin",
    "role": "admin"
  }
}
```

**Employee Object:**
```json
{
  "id": "e1",
  "name": "An Nguyen",
  "email": "an.nguyen@example.com",
  "position": "Frontend Engineer",
  "department": "Engineering",
  "status": "active",
  "createdAt": "2026-06-30T..."
}
```

---

## ✅ Checklist Hoàn Thiện

### Sửa lỗi (Bug Fixes)
- [ ] **useLogin**: Redirect theo role (admin → /admin, employee → /attendance)
- [ ] **useLogout**: Redirect về `/login` thay vì `/`
- [ ] **GuardAuth**: Thêm kiểm tra role (không chỉ token)
- [ ] **auth-store**: Đồng bộ field `name`/`fullName` với API
- [ ] **apiClient**: Sửa type `AuthLogin.user` (không dùng union `AuthUser | string`)

### Route & Guard
- [ ] Tạo `RoleGuard` component (kiểm tra token + role)
- [ ] Tạo `AttendancePage` (chỉ hiển thị text "Chấm công")
- [ ] Tạo placeholder `EmployeeDetailPage`
- [ ] Tạo placeholder `CreateEmployeePage`
- [ ] Thêm tất cả route vào `router.tsx`

### Admin Page (Danh sách)
- [ ] Sửa `useList` hook — thêm logic filter thực sự
- [ ] Sửa `AdminPage` — xử lý Loading state
- [ ] Sửa `AdminPage` — xử lý Error state + nút Retry
- [ ] Sửa `AdminPage` — xử lý Empty state
- [ ] Sửa `AdminPage` — gắn Input search với `setSearch`
- [ ] Sửa `AdminPage` — dùng `filtered` thay vì `employees`
- [ ] Sửa `AdminPage` — click row → navigate đến detail
- [ ] Sửa Table header đúng cấu trúc shadcn/ui

### Employee Detail
- [ ] Thêm `apiClient.getEmployeeDetail(id)`
- [ ] Tạo `useEmployee(id)` hook
- [ ] Hoàn thiện `EmployeeDetailPage` (loading, error, info, nút quay lại)

### Create Employee
- [ ] Thêm `apiClient.createEmployee(data)`
- [ ] Tạo Zod schema cho form create
- [ ] Tạo `useCreateEmployee` mutation hook
- [ ] Hoàn thiện `CreateEmployeePage` (form, validate, submit)
- [ ] Invalidate `["employees"]` query sau khi tạo thành công

---

## 🚀 Cách Chạy & Test

```powershell
# Từ thư mục gốc project:
.\dev.cmd
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000  
Swagger docs: http://localhost:4000/docs

Tài khoản test:
- **Admin**: admin@example.com / admin123
- **Employee**: employee@example.com / employee123

---

> **Ghi chú**: File này được tạo để hướng dẫn từng bước. Khi hoàn thành mỗi mục trong checklist, hãy test lại bằng cách chạy app và kiểm tra luồng hoạt động.
