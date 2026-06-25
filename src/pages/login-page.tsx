import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export {
    
}

export function LoginPage(){
    return(
        <div className="flex min-h-svh items-center justify-center p-6">
            <form >
                <Card>
                    <CardTitle className="min-w-70 text-left mx-2">Email</CardTitle>
                    <CardContent>
                        <Input type="text"></Input>
                    </CardContent>
                    <CardTitle className="min-w-70 text-left mx-2">PassWord</CardTitle>
                    <CardContent>
                        <Input type="password"></Input>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}