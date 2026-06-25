# Runs the bundled reference backend (server/) and the FE dev server together,
# in one terminal. Installs dependencies on first run if they're missing.
# Press Ctrl-C to stop both.
#
#   BE -> http://localhost:4000  (Swagger: /docs)
#   FE -> http://localhost:5173
#
# Login accounts: admin@example.com / admin123  |  employee@example.com / employee123

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

if (-not (Test-Path "$root\node_modules")) {
  Write-Host "==> Installing frontend dependencies (pnpm install)..." -ForegroundColor Cyan
  pnpm --dir "$root" install
}
if (-not (Test-Path "$root\server\node_modules")) {
  Write-Host "==> Installing backend dependencies (npm install)..." -ForegroundColor Cyan
  npm --prefix "$root\server" install
}

& "$root\server\node_modules\.bin\concurrently.cmd" `
  --kill-others `
  --names "be,fe" `
  --prefix-colors "blue.bold,green.bold" `
  "npm --prefix $root\server run dev" `
  "pnpm --dir $root dev"
