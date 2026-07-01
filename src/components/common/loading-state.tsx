export function LoadingState({ statusMsg = "Loading..." }: { statusMsg?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <p className="text-sm text-muted-foreground">{statusMsg}</p>
    </div>
  )
}
