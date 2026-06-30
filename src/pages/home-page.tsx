import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const STACK = [
  "React 18 + Vite",
  "TypeScript",
  "Tailwind CSS v4 + shadcn/ui",
  "React Router",
  "Axios",
  "Zustand",
  "TanStack React Query",
  "React Hook Form",
  "Zod",
]
export function HomePage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>FE Test</CardTitle>
          <CardDescription>
            Base project is set up and running. Start building your feature in{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              src/features
            </code>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {STACK.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="bg-primary size-1.5 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
