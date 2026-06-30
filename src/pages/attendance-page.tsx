import { Button } from "@/components/ui/button"
import { useLogout } from "@/features/auth/hooks/use-logout"

export default function Attendance() {
  const logout = useLogout()
  return (
    <div>
      Attendance
      <Button
        onClick={() => {
          logout.mutate()
        }}
      >
        Logout
      </Button>
    </div>
  )
}
