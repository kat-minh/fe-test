export function EmptyState({
  message = "No data available.",
}: {
  message?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center border border-dashed rounded-lg p-6">
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  )
}
