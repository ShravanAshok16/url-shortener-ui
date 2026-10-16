# URL Shortener — Frontend

React + TypeScript SPA for the [URL Shortener API](https://github.com/ShravanAshok16/UrlShortener).

> **Last Updated:** 2026-10-16

---

## 📌 Current Status

**Phase:** Auth flow + landing page working
**Progress:** `[████░░░░░░] 40%`

### ✅ Done
- Vite + React 19 + TypeScript
- Tailwind CSS v4 with design tokens
- API client with interceptors
- API modules: `auth`, `links`
- UI primitives: `Button`, `Input`, `Card`
- **Auth flow**: register, login, logout, session persistence
- **`useAuth` hook** + `AuthProvider` context
- **`ProtectedRoute`** with return-to redirect
- **LandingPage** — hero, shorten form (redirects guests to register)
- **RegisterPage** — validation, auto-login on success
- **LoginPage** — return-to redirect after login
- **DashboardPage** — placeholder (real content on Day 13)
- **NotFoundPage** — 404 handler
- **Header + Container** layout components
- Routes wired in `App.tsx`

### 🚧 In Progress
- Preparing for Day 13 (dashboard with list, delete, copy)

### 📝 Next Up (Day 13)
- Fetch user's links with React Query
- Table view on desktop, cards on mobile
- Copy-to-clipboard with toast
- Delete with confirmation dialog
- Pagination controls
- Empty state, loading skeletons
- Search, filter, sort controls

---

## 📚 Documentation

- [Design System](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/DESIGN.md) — colors, typography, components
- [Frontend Structure](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/FRONTEND_STRUCTURE.md) — conventions
- [Requirements](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/REQUIREMENTS.md) — full spec

---

## 🗓️ Daily Log

### 2026-10-16 (Day 12 — Auth Flow)
- Split `useAuth` into two files to satisfy Fast Refresh:
  - `auth-context.ts` — context + hook
  - `useAuth.tsx` — `AuthProvider` component
- Added `tokenStorage` helper in `api/client.ts`
- 401 responses now dispatch `auth:unauthorized` event
- `AuthProvider`:
  - Lazy-initializes email from localStorage (no cascading renders)
  - Listens for `auth:unauthorized` to clear session
  - Exposes `register`, `login`, `logout`, `isAuthenticated`
- `ProtectedRoute`:
  - Redirects unauthenticated users to `/login`
  - Saves attempted URL in router state for return-to
- `Header` — auth-aware nav (Login/Sign up vs email + Logout)
- `Container` — max-width wrapper for consistent page gutters
- `LandingPage` — hero, shorten form, guest redirect to register
- `RegisterPage` — email/password with client-side validation
- `LoginPage` — login with return-to redirect
- `DashboardPage` — placeholder showing signed-in email
- `NotFoundPage` — 404 handler
- `App.tsx` — routes wired with `AuthProvider` + `ProtectedRoute`

### 2026-10-15 (Day 11 — Setup)
- Vite + React 19 + TypeScript project
- Tailwind CSS v4 with `@theme` tokens
- Inter + JetBrains Mono fonts
- `.env.local` for `VITE_API_URL`
- Folder structure (api / components / features / pages / styles / lib)
- API client with request/response interceptors
- API modules: `auth.ts`, `links.ts`, `types.ts`
- UI primitives: `Button`, `Input`, `Card`
- React Query + React Router + Sonner wired
- Pushed to GitHub with README + topics

<!-- Add new entries at the top, newest first -->

---

## 🏗️ Project Structure
```
url-shortener-ui/
├── src/
│   ├── api/                    # HTTP layer
│   │   ├── client.ts           # axios instance + interceptors
│   │   ├── auth.ts             # register, login
│   │   ├── links.ts            # createLink, listLinks, deleteLink
│   │   └── types.ts            # DTOs matching backend
│   ├── components/
│   │   ├── ui/                 # Button, Input, Card
│   │   └── layout/             # Header, Footer, Container
│   ├── features/
│   │   ├── auth/               # components + hooks for auth
│   │   ├── links/              # components + hooks for links
│   │   └── landing/            # landing page components
│   ├── hooks/                  # shared hooks
│   ├── lib/                    # utils (cn, format, validation)
│   ├── pages/                  # route-level components
│   ├── styles/
│   │   └── globals.css         # Tailwind directives + theme
│   └── types/                  # global types
├── public/
├── .env.example
├── .env.local                  # gitignored
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


### Layer Rules

| Folder | Purpose | Rule |
|---|---|---|
| `api/` | HTTP layer | The **only** place that talks to the backend |
| `components/ui/` | Primitives | No domain knowledge |
| `components/layout/` | Structure | Header, Container, ProtectedRoute |
| `features/` | Feature modules | Self-contained — components + hooks + types |
| `hooks/` | Shared hooks | Only if used by >1 feature |
| `lib/` | Utilities | `cn()`, formatting, validation |
| `pages/` | Route components | Thin — wire features together |

**Import rules:**
- Features don't import from each other
- `useAuth` (hook) → import from `auth-context`
- `AuthProvider` (component) → import from `useAuth`

---

## 🔌 API Integration

### Base URL
From `VITE_API_URL` in `.env.local`:


### Endpoints used

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/Auth/register` | Create account, returns JWT |
| `POST` | `/api/Auth/login` | Authenticate, returns JWT |
| `POST` | `/api/Links` | Create short link |
| `GET` | `/api/Links` | List user's links |
| `DELETE` | `/api/Links/{id}` | Soft-delete a link |

### Auth
- JWT stored in `localStorage` (key: `url-shortener-token`)
- Attached automatically via axios request interceptor
- 401 responses trigger session clear + event dispatch

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript** (strict)
- **Vite** (build)
- **Tailwind CSS v4** (styling)
- **TanStack Query v5** (server state)
- **React Router v7** (routing)
- **Axios** (HTTP)
- **Sonner** (toasts)
- **Lucide React** (icons)

---

## 🚀 Setup

### Prerequisites
- Node.js 20+
- Backend running locally or on Render

### 1. Clone & Install

```bash
git clone https://github.com/ShravanAshok16/url-shortener-ui.git
cd url-shortener-ui
npm install