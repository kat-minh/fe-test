import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/common/StatusStates"
import { useLogoutMutation, useUser } from "../hook/useAuth"
import { Button } from "@/shared/components/ui/button"
import { LogOut } from "lucide-react"
const EmployeePage = () => {
  const logoutMutation = useLogoutMutation()
  const onSubmit = async () => {
    logoutMutation.mutate()
  }
  const {
    data: user, //
    isError,
    error,
    refetch,
    isLoading,
  } = useUser()

  if (isLoading) return <LoadingState />
  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load profile"}
        onRetry={() => refetch()}
      />
    )
  }

  if (!user) return <EmptyState message="Không tìm thấy user" />

  return (
    <>
      <div>GET ME</div>
      <h1>{user?.user?.name}</h1>
      <p>{user?.user?.id}</p>
      <p>{user?.user?.email}</p>
      <p>{user?.user?.role}</p>

      <Button disabled={logoutMutation.isPending} onClick={onSubmit}>
        <LogOut />
        {logoutMutation.isPending ? "Đang đăng xuất" : "Logout"}
      </Button>
    </>
  )
}

export default EmployeePage
