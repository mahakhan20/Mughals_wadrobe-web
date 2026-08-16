# Mughals Wardrobe — Final Project Report
**Project:** Mughals Wardrobe – Full-Stack Responsive E-Commerce Web Application
**Intern:** Maha Khan
**Internship ID:** ZYNVEX-CERT-0506
**Program:** Zynvex Solutions – Web Development Internship
**Duration:** July 20, 2026 – August 15, 2026 (4 Modules)

---

## 1. Project Overview

Mughals Wardrobe is a full-stack, fully responsive e-commerce web
application built entirely as a local development project — front end,
back end, and database all running locally with no live deployment. The
project began as a static, front-end-only prototype and evolved over four
modules into a complete client-server application with a real database,
secure user authentication, a functional shopping cart, and order
placement.

### Tech Stack
| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+), Fetch API |
| Backend | Node.js, Express.js |
| Database | MongoDB (local instance), Mongoose |
| Auth | bcryptjs (password hashing), jsonwebtoken (JWT sessions) |
| Tools | Git, GitHub, Postman, VS Code, MongoDB Compass |

### Final Page List
Home, Shop, Single Product, Cart, Signup/Login, About, Contact, My Orders — all fully responsive across mobile, tablet, and desktop.

---

## 2. Module 1 — Foundation & Static Frontend
**Timeline:** July 20 – July 26, 2026 (Days 1–7) | **Status:** Complete

Laid the foundation of the project: requirement gathering, wireframing,
and building all seven core pages as fully responsive, static HTML/CSS/JS,
alongside initializing the Node.js/Express backend server and a local
MongoDB connection.

**Key deliverables:**
- All 7 frontend pages built and mobile-responsive
- Working hamburger navigation menu
- Express server skeleton + local MongoDB connection configured (Days 6–7)
- Backend organized in MVC-style structure (`routes/`, `controllers/`, `models/`) ahead of API development

**Key decision:** Frontend and backend kept fully decoupled (REST API
architecture) from the start — no server-side rendering. MongoDB
runs locally only; no MongoDB Atlas or live deployment was used at any
point in the project.

*(Full day-by-day breakdown: [docs/module1-summary.md](module1-summary.md), Days 1–7)*

---

## 3. Module 2 — Product API & Live Data Integration
**Timeline:** July 27 – July 30, 2026 (Days 8–11) | **Status:** Complete

Built the Product API from scratch (schema, full CRUD routes) and
replaced every hardcoded product listing across the site with live data
fetched from the backend.

**Key deliverables:**
- Product schema (Mongoose) and full REST API: GET all, GET one, POST, PUT, DELETE (Days 8–10)
- Consistent JSON response format and proper error handling (400/404) across all endpoints
- Home, Shop, and Single Product pages converted from static HTML to live, database-driven content (Day 11)
- Single Product page fully dynamic (`?id=` driven) — every product automatically gets a working detail page
- Working Add to Cart (using localStorage at this stage), live cart badge, and a functional Cart page — pulled forward from what was originally planned for Module 3
- `seed.js` script for quickly populating the local database with sample products

*(Full day-by-day breakdown: [docs/module2-summary.md](module2-summary.md), Days 8–11)*

---

## 4. Module 3 — Authentication, Real Cart & Contact Backend
**Timeline:** Aug 03 – Aug 09, 2026 (Days 12–16, + buffer day) | **Status:** Complete

Made the site fully interactive: real user accounts, a database-backed
shopping cart tied to each user, and a working Contact form — while also
finding and fixing two real bugs along the way.

**Key deliverables:**
- Backend Cart API (Day 12), connected to the Cart page (Day 13) — add, update quantity, remove, auto-calculated totals
- Authentication backend: Signup (bcrypt password hashing) and Login (JWT sessions), plus a rebuilt Signup/Login page (Day 14) — previously had no working signup form at all
- Per-user cart separation fix (Day 15)
- Contact form connected to a real backend endpoint, navbar reflecting login state ("Hi, [Name]" + Logout), and admin-only protection added to product-modifying routes (Day 16) — closing a gap where any logged-in user could previously edit the catalog

**Notable engineering decision:** The cart was originally designed around
guest sessions (a random ID stored in the browser, later merged into a
user's account on login). This surfaced a real MongoDB bug — a sparse
unique index broke once more than one cart existed, due to Mongoose
writing an explicit `null` into unset fields. Rather than patch around
it, the cart was redesigned mid-module (Day 15) to require login
entirely, removing the guest-session complexity and the bug along with
it. This was verified working correctly across multiple separate user
accounts.

*(Full day-by-day breakdown: [docs/module3-summary.md](module3-summary.md), Days 12–16)*

---

## 5. Module 4 — Hardening, Testing & Final Polish
**Timeline:** Aug 10 – Aug 15, 2026 (Days 17–22) | **Status:** Complete

The final module focused on session-handling correctness, a deliberate
edge-case and error-handling pass, code cleanup, and final documentation
before submission.

**Key deliverables:**
- **Session expiry handling & responsive re-test (Day 17):** the
  frontend previously never checked whether a stored login token had
  expired, which could leave a broken "logged in" UI state. Added
  detection for expired/invalid tokens on page load and mid-session,
  tested with valid, expired, and corrupted tokens. Also re-verified all
  7 pages across mobile/tablet/desktop now that real login state and
  live cart data exist.
- **Fresh end-to-end setup test (Day 18):** validated the project can be
  set up and run using only the README, simulating a completely clean
  environment (no local config, dependencies, or database carried over).
- **Order placement design (considered, admin panel ultimately
  descoped):** an Orders model, checkout flow with shipping address
  collection, and a first-order-free shipping rule were designed and
  backend-tested. A broader admin dashboard (order management,
  role-based access, admin-only signup key) was prototyped but
  **intentionally dropped** to keep scope aligned with the original
  Zynvex proposal, with development redirected back to core Module 4
  testing and polish work.
- **Edge-case & error-handling pass (Day 19):** deliberately tested empty
  states, invalid logins, malformed input, and backend-offline behavior.
  Found and fixed three real bugs:
  1. Signup accepted a whitespace-only name.
  2. Signup had no email format validation at all (unlike the Contact form).
  3. Cart quantity updates accepted non-numeric input (e.g. `"abc"`) and
     saved it directly to the database — a genuine data-integrity bug.
- **Code cleanup (Day 20):** audited the codebase for debug leftovers,
  unused imports, and unused dependencies — found the codebase already
  clean, confirming the edge-case fixes were the main output of this stage.
- **Documentation consolidation (Day 21):** brought together
  all daily logs and module summaries into this single final report, and
  audited the README for accuracy.

**Completed:**
- Day 22 (Aug 15): Final GitHub push and submission.

*(Full day-by-day breakdown: [docs/module4-summary.md](module4-summary.md), Days 17–22)*

---

## 6. Known Limitations & Future Improvements

Being upfront about scope boundaries:
- **Local development only** — by design, no live/production deployment (no MongoDB Atlas, no hosting).
- **No payment gateway** — checkout captures shipping details; no real payment processing is integrated.
- **Flat-rate shipping** — free on a customer's first order, a flat fee after; not calculated from real courier/distance data.
- **No password reset flow.**
- **No admin dashboard** — a full admin panel (order management, user management, role-based signup) was prototyped during Module 4 but intentionally descoped to stay aligned with the original project proposal. Product management is done directly via the API.

## 7. Final Reflections

Across four modules, the project grew from a static prototype into a
functioning full-stack application with real authentication, a
persistent per-user cart, and order-ready checkout logic — while also
surfacing and fixing several genuine bugs along the way (a MongoDB
indexing issue, input validation gaps, and a UI security/UX gap around
session expiry). Each fix was tested before being considered complete,
rather than assumed to work. The admin dashboard experiment in Module 4,
while ultimately descoped, was a useful exercise in recognizing scope
creep and redirecting effort back toward the project's original,
agreed-upon goals.

---

## Appendix: Full Documentation Index
- [Module 1 Summary](module1-summary.md) — Days 1–7
- [Module 2 Summary](module2-summary.md) — Days 8–11
- [Module 3 Summary](module3-summary.md) — Days 12–16
- [Module 3 Summary](module4-summary.md) — Days 17–22