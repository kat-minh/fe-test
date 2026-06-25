# FE Test

Base project for the FE code test. Everything is wired up — no feature
code yet. Build your feature under `src/features`.

## Stack

| Concern      | Library                       |
| ------------ | ----------------------------- |
| Build / dev  | Vite + React 18 + TypeScript  |
| Styling / UI | Tailwind CSS v4 + shadcn/ui   |
| Routing      | React Router (`BrowserRouter` in `main.tsx`) |
| HTTP         | Axios (`src/lib/axios.ts`)    |
| Server state | TanStack React Query          |
| Client state | Zustand (`src/store`)         |
| Forms        | React Hook Form               |
| Validation   | Zod (+ `@hookform/resolvers`) |

## Getting started

```bash
npm install
cp .env.example .env   # then fill in VITE_API_BASE_URL when you have an API
npm run dev
```

Other scripts:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run format    # prettier
```

## Project structure

```
src/
├── main.tsx                 # entry (QueryProvider + RouterProvider)
├── router.tsx               # React Router v7 data router (createBrowserRouter)
├── index.css                # Tailwind v4 + shadcn theme tokens
├── pages/                   # route pages (home-page.tsx = sample route)
├── components/
│   └── ui/                  # shadcn/ui primitives (button, input, label, card, table, badge)
├── providers/
│   └── query-provider.tsx   # React Query client + devtools
├── lib/
│   ├── axios.ts             # shared axios instance + interceptors
│   └── utils.ts             # cn() helper
├── store/
│   └── auth-store.ts        # example Zustand store
├── hooks/                   # shared hooks
└── features/                # ← build your feature here
```

## Adding shadcn/ui components

The project is already initialised for shadcn (see `components.json`). Add more
primitives with:

```bash
npx shadcn@latest add dialog dropdown-menu table
```

## Notes

- The `@` alias maps to `src/` (configured in `vite.config.ts` + `tsconfig`).
- `VITE_API_BASE_URL` is intentionally empty — point it at a real API when ready.
- React Query Devtools are enabled in dev (bottom of the screen).
