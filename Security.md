# Security Policy

## URL Shortener UI

A responsive React 19 frontend for the URL Shortener API. 

🌐 **Live App:** [https://url-shortener-ui-flax.vercel.app](https://url-shortener-ui-flax.vercel.app)  
🔌 **API Repo:** [UrlShortener](https://github.com/ShravanAshok16/UrlShortener)

![Dashboard Screenshot](public/screenshot-dashboard.png)

### ✨ Features
- **Authentication:** JWT-based login and registration with session persistence.
- **Dashboard:** Paginated table (desktop) and cards (mobile).
- **Batch Actions:** Multi-select checkboxes with optimistic batch deletion.
- **Search & Sort:** Debounced search input with server-side sorting.
- **Performance:** Lighthouse scores of 99 (Desktop) and 93 (Mobile).

## Supported Versions

Currently, only the latest deployment on `main` is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please open an issue on GitHub or contact Shravan Ashok. All security vulnerabilities will be promptly addressed.

---

## Security Decisions & Architecture

This project was built with security as a first-class requirement, not an afterthought. Here are the key decisions:

### 1. Authentication & Authorization
- **JWT (JSON Web Tokens):** Tokens are signed with HS256 (256-bit secret) and expire in 30 minutes.
- **Password Hashing:** Passwords are hashed using BCrypt with a work factor of 11.
- **Authorization:** Ownership rules are strictly enforced on the backend. Users can only read/delete their own links.
- **Enumeration Prevention:** The API returns `404 Not Found` (instead of 403 Forbidden) when a user tries to access or delete another user's link. Login returns the same error for unknown emails and wrong passwords.

### 2. Transport & Headers
- **HSTS:** Enforced via `UseHsts()` in production, and `Strict-Transport-Security` header on the frontend.
- **CORS:** Restricted strictly to the Vercel frontend URL and localhost.
- **Security Headers:** Both the API and Frontend return `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Content Security Policy (CSP):** 
  - Backend: `default-src 'none'` (strictest possible for JSON API).
  - Frontend: Restricted via `vercel.json` to only allow self, Google Fonts, and the Render API.

### 3. Input Validation & Data Integrity
- **Validation:** FluentValidation on all backend DTOs.
- **URL Allowlist:** Only `http://` and `https://` schemes are accepted (prevents XSS via `javascript:` or SSRF via `file://`).
- **Rate Limiting:** Global limit of 100 requests/minute per IP, and 10 requests/minute for auth endpoints.

### 4. Data Protection
- **PII:** User IP addresses are hashed using HMAC-SHA256 with a secret salt before being stored in the database. Raw IPs are never saved.
- **Error Handling:** Global exception middleware ensures stack traces are never leaked to the client in production.
- **Secrets:** Never committed to the repository. Managed via User Secrets locally and Environment Variables in production.