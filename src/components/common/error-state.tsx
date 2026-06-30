import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  )
}
