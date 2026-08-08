# Module 3 – Summary Report
**Timeline:** August 3 – August 9, 2026
**Project:** Mughals Wardrobe – Full-Stack Responsive E-Commerce Web Application
**Intern:** Maha Khan (ZYNVEX-CERT-0506)

## Module Objective
Module 3 focused on making the site fully interactive: a real shopping
cart backed by the database, user authentication (Signup/Login with JWT),
a working Contact form, and securing the admin-only parts of the API.

## Day-Wise Summary

| Day | Date | Focus | Details |
|---|---|---|---|
| Day 12 | Aug 3 | Backend Cart API | [docs/day10.md](day12.md) |
| Day 13 | Aug 4 | Connecting Cart Page to Backend | [docs/day13.md](day13.md) |
| Day 14 | Aug 5 | Signup Backend (bcrypt) | [docs/day14.md](day14.md) |
| Day 15 | Aug 6 | Login (JWT) & Signup/Login Page | [docs/day15.md](day15.md) |
| Day 16 | Aug 7 | Contact Backend, Navbar Login State, Protected Admin Routes & Cart Redesign | [docs/day16.md](day16.md) |

## What Was Built

### Backend
- **Cart API** — fully redesigned partway through the module: initially
  guest-session based, later corrected to require login entirely after a
  MongoDB indexing bug was found. Every cart is now tied to a real user
  account (`GET/POST/PUT/DELETE /api/cart...`).
- **Auth API** — `POST /api/auth/signup` (bcrypt password hashing) and
  `POST /api/auth/login` (returns a JWT valid for 7 days).
- **Contact API** — `POST /api/contact` (public submission) and
  `GET /api/contact` (admin-only, protected).
- **Auth middleware** — `identifyUser` (optional) and `requireAuth`
  (blocking), used to protect cart routes, contact viewing, and admin
  product routes (create/update/delete).

### Frontend
- Signup/Login page rebuilt from scratch with a tab toggle — the page
  previously had no working signup form at all.
- Cart page fully functional: add, update quantity, remove, and
  auto-calculated totals — now requires login, with a redirect prompt if
  the user tries to add to cart while logged out.
- Navbar shows "Hi, [Name]" + Logout once logged in, on every page.
- Contact form connected to the backend with inline success/error messaging.

## Technologies Used
- **Auth:** bcryptjs (password hashing), jsonwebtoken (JWT sessions)
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB (local instance)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Fetch API
- **Tools:** Git, GitHub, Postman, VS Code, MongoDB Compass

## Key Decisions Made This Module
- Switched the cart from a guest-session model to a login-required model
  mid-module, after finding a real MongoDB sparse-index bug — prioritized
  correctness over sticking to the original design.
- Admin routes (product create/update/delete, viewing contact messages)
  are protected with JWT; public browsing (GET routes) stays open to everyone.
- Passwords are never stored or returned in plain text — verified via
  testing that only bcrypt hashes are persisted.

## Testing
Every backend feature this module was verified with logic-level tests
before being handed off, covering both expected and edge cases (missing
fields, invalid IDs, wrong passwords, unauthorized access, cross-user
data isolation). The cart redesign was additionally verified manually
end-to-end across multiple real logins after a local database reset.

## Module 3 Status: Complete
All planned deliverables (Cart, Signup/Login, Contact backend, responsive
design) are done, on schedule, with two additional fixes (admin route
protection, corrected per-user cart) that weren't in the original scope
but closed real gaps found during development.

## Next Steps (Module 4 – Aug 10 – Aug 15, 2026)
- Full cross-device responsive re-test after this module's backend changes.
- End-to-end fresh-setup test following the README from scratch.
- Edge-case and error-handling pass across all forms and flows.
- Code cleanup and final repository organization.
- Consolidate documentation into a final project report.
- Final submission by Aug 15.