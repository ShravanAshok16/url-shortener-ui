# URL Shortener — Frontend

React + TypeScript SPA for the [URL Shortener API](https://github.com/ShravanAshok16/UrlShortener).

> **Last Updated:** 2026-10-17

---

## 📌 Current Status

**Phase:** Dashboard complete — ready for deployment
**Progress:** `[████████░░] 80%`

### ✅ Done
- Vite + React 19 + TypeScript foundation
- Tailwind CSS v4 with custom design tokens (`@theme`)
- Axios API client with interceptors (auth + error handling)
- UI primitives: `Button`, `Input`, `Card`, `Dialog`, `Skeleton`, `EmptyState`
- Auth flow: `AuthProvider`, `useAuth`, `ProtectedRoute`, session persistence
- Pages: Landing, Login, Register, Dashboard, NotFound
- Layouts: Header (with responsive nav), Container
- **Dashboard Features:**
  - `useLinks` hook (React Query, paginated, sortable, searchable)
  - `LinkTable` (desktop) + `LinkCard` (mobile) responsive views
  - `CopyButton` with visual + toast feedback
  - `DeleteDialog` for single deletion with confirmation
  - **Batch selection** with floating action bar and confirmation modal
  - **Debounced search** (`useDebounce` hook) to prevent API spam
  - Sorting (newest, oldest, most clicks, fewest clicks)
  - Pagination (prev/next)
  - `formatRelative` helper for timestamps
  - Skeleton loaders and empty states (no data vs. no search results)
  - Optimistic UI for deletions (instant feedback)
- **Navigation:** Landing page success toast links directly to dashboard; header has a persistent dashboard link

### 🚧 In Progress
- Preparing for Day 14 (Deploy to Vercel + Security Audit)

### 📝 Next Up (Day 14)
- Create Vercel project and link GitHub
- Configure Vercel environment variables (`VITE_API_URL`)
- Create `vercel.json` with security headers (CSP, HSTS, etc.)
- Update Render backend CORS to allow Vercel domain
- Run Lighthouse audit (target ≥ 90)
- Accessibility pass (keyboard nav, screen reader)
- Write `SECURITY.md`

---

## 📚 Documentation

- [Design System](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/DESIGN.md)
- [Frontend Structure](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/FRONTEND_STRUCTURE.md)
- [Requirements](https://github.com/ShravanAshok16/UrlShortener/blob/main/docs/REQUIREMENTS.md)

---

## 🗓️ Daily Log

### 2026-10-17 (Day 13 — Dashboard Core + Polish)
- Built `useLinks` hook with React Query (paginated, filtered, sorted).
- Built `useDeleteLink` and `useBatchDeleteLinks` mutations with optimistic updates.
- Created responsive views:
  - `LinkTable` for desktop (checkboxes, columns).
  - `LinkCard` for mobile (stacked, checkboxes).
- Added `DeleteDialog` for single-item deletion.
- Added batch delete flow with floating action bar and `<Dialog>` confirmation.
- Built `useDebounce` hook and applied it to the dashboard search input.
- Added `formatRelative` helper for human-readable dates.
- Fixed React Query cache invalidation: creating a link on the landing page now immediately updates the dashboard list.
- Fixed a TypeScript caching issue on Windows (removed duplicate `copyButton.tsx` casing).
- Silenced React 19 ESLint warning by removing a redundant `useEffect` for selection clearing (handled in event handlers instead).
- Added Dashboard links to the Header and the Landing Page result flow.

### 2026-10-16 (Day 12 — Auth Flow)
- Split `useAuth` into `auth-context.ts` and `useAuth.tsx` (Fast Refresh).
- Added `tokenStorage` helper and `auth:unauthorized` event for 401s.
- Created `AuthProvider`, `useAuth` hook, and `ProtectedRoute` with `from` redirect.
- Built Landing, Register, Login, Dashboard (placeholder), and NotFound pages.
- Added `Header` and `Container` layout components.

### 2026-10-15 (Day 11 — Setup)
- Vite + React 19 + TypeScript project.
- Tailwind CSS v4 with `@theme` tokens.
- Axios client, API modules (`auth`, `links`), and UI primitives.

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
| `lib/` | Utilities | `cn()`, `formatRelative`, etc. |
| `pages/` | Route components | Thin — wire features together |

**Import rules:**
- Features don't import from each other.
- `useAuth` (hook) → import from `auth-context`.
- `AuthProvider` (component) → import from `useAuth`.

---

## 🔌 API Integration

### Base URL
From `VITE_API_URL` in `.env.local`.

### Endpoints used
| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/Auth/register` | Create account, returns JWT |
| `POST` | `/api/Auth/login` | Authenticate, returns JWT |
| `POST` | `/api/Links` | Create short link (deduplicates existing user URLs) |
| `GET` | `/api/Links` | List user's links (paginated, filterable, sortable) |
| `DELETE` | `/api/Links/{id}` | Soft-delete a link |

---

## 🛠️ Tech Stack

- **React 19**, **TypeScript** (strict)
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **TanStack Query v5** (server state, optimistic updates)
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