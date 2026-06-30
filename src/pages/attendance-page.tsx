import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/features/auth/hooks/use-logout"

export function AttendancePage(){


    const logoutMutation = useLogoutMutation()

    const onSubmit = () => {
        logoutMutation.mutate()
    }

    return(
        <div>
            <div>Chấm công</div>
            <Button onClick={onSubmit}>Đăng xuất</Button>
        </div>
    )
}