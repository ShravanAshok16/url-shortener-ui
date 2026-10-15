# URL Shortener — Frontend

React + TypeScript SPA for the [URL Shortener API](https://github.com/ShravanAshok16/UrlShortener).

> **Last Updated:** 2026-10-15

---

## 📌 Current Status

**Phase:** Foundation complete
**Progress:** `[███░░░░░░░] 30%`

### ✅ Done
- Vite + React 19 + TypeScript
- Tailwind CSS v4 with design tokens from `docs/DESIGN.md`
- Inter + JetBrains Mono fonts
- `.env.local` for environment config
- Folder structure (api / components / features / pages / styles / lib)
- **API client** — axios instance with request + response interceptors
- **API modules** — `auth.ts`, `links.ts`, `types.ts`
- **UI primitives** — `Button`, `Input`, `Card`
- React Query + React Router + Sonner toaster wired

### 🚧 In Progress
- Preparing for Day 12 (auth pages + protected routes)

### 📝 Next Up (Day 12)
- `useAuth` hook + auth context
- `ProtectedRoute` wrapper
- Landing page with shorten form
- Register + Login pages (React Hook Form + Zod)
- Full auth flow: register → auto-login → dashboard → logout

---

## 🗓️ Daily Log

### 2026-10-15 (Day 11 — Setup)
- Created Vite + React 19 + TypeScript project
- Installed Tailwind CSS v4 + `@tailwindcss/vite`
- Configured design tokens in `src/styles/globals.css` via `@theme`
  - Renamed `--color-primary` to `--color-brand` to avoid Tailwind v4 name collision
- Loaded Inter + JetBrains Mono from Google Fonts
- Created folder structure
- Built API client (`src/api/client.ts`) with:
  - `baseURL` from `VITE_API_URL`
  - Request interceptor: attaches JWT to every request
  - Response interceptor: normalizes errors, clears token on 401
- Created API modules (`auth.ts`, `links.ts`) and DTO types
- Built UI primitives:
  - `Button` — 4 variants, 3 sizes, loading state
  - `Input` — label, error, helper text, ARIA wiring
  - `Card` — bordered, shadowed container
- Verified all primitives render correctly at `localhost:5173`
- Pushed to GitHub with README + topics

<!-- Add new entries at the top, newest first -->

---

## 🏗️ Project Structure
url-shortener-ui/
├── src/
│ ├── api/ # HTTP layer
│ │ ├── client.ts # axios instance + interceptors
│ │ ├── auth.ts # register, login
│ │ ├── links.ts # createLink, listLinks, deleteLink
│ │ └── types.ts # DTOs matching backend
│ ├── components/
│ │ ├── ui/ # Button, Input, Card
│ │ └── layout/ # Header, Footer, Container
│ ├── features/
│ │ ├── auth/ # components + hooks for auth
│ │ ├── links/ # components + hooks for links
│ │ └── landing/ # landing page components
│ ├── hooks/ # shared hooks (useMediaQuery, etc.)
│ ├── lib/ # utils (cn, format, validation)
│ ├── pages/ # route-level components
│ ├── styles/globals.css # Tailwind directives + theme
│ └── types/ # global types
├── public/
├── .env.example
├── .env.local # gitignored
├── index.html
├── package.json
├── tailwind.config.ts # (deleted — using v4 @theme in CSS)
├── tsconfig.json
├── vite.config.ts
└── README.md


### Layer Rules

- **`api/`** — the only place that talks to the backend
- **`components/ui/`** — dumb primitives, no domain knowledge
- **`features/`** — self-contained modules (components + hooks + types per feature)
- **`pages/`** — thin wrappers, wire components together
- Features don't import from each other — shared code moves up to `components/` or `lib/`

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript** (strict mode)
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **TanStack Query v5** (server state)
- **React Router v7** (routing)
- **Axios** (HTTP client)
- **React Hook Form** (forms)
- **Zod** (schema validation)
- **Sonner** (toasts)
- **Lucide React** (icons)

---

## 🚀 Setup

### Prerequisites
- Node.js 20+
- Backend running locally (or use the deployed API)

### 1. Clone & Install

```bash
git clone https://github.com/ShravanAshok16/url-shortener-ui.git
cd url-shortener-ui
npm install