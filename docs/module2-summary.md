# Module 2 – Summary Report
**Timeline:** July 27 – Aug 02, 2026
**Project:** Mughals Wardrobe – Full-Stack Responsive E-Commerce Web Application
**Intern:** Maha Khan (ZYNVEX-CERT-0506)

## Module Objective
Module 2 focused on building the Product API — schema design, CRUD routes —
and connecting the previously static frontend pages to live backend data,
turning the site from a static prototype into a working full-stack
application with a functional shopping cart.

## Day-Wise Summary

| Day | Date | Focus | Details |
|---|---|---|---|
| Day 6 | Jul 27 | Product Schema Design | [docs/day6.md](day6.md) |
| Day 7 | Jul 28 | Product API (GET Routes) | [docs/day7.md](day7.md) |
| Day 8 | Jul 29 | Admin Product Routes | [docs/day8.md](day8.md) |
| Day 9 | Jul 30 | Connecting Shop & Single Product Pages + Working Cart | [docs/day9.md](day9.md) |

## What Was Built

### Backend
- Product schema (Mongoose) — name, description, price, quantity, image, category, timestamps
- User schema — name, email (unique), password, ready for Module 3 auth
- Full Product REST API: GET all, GET single, POST, PUT, DELETE
- Consistent JSON response format across all endpoints
- Proper error handling — 400 for invalid IDs, 404 for not found
- `seed.js` script to populate the local database with sample products

### Frontend
- Home, Shop, and Single Product pages now pull live data from the backend instead of hardcoded HTML
- Single Product page is fully dynamic (`?id=` driven), so every product automatically gets a working detail page
- Related Products section on the Single Product page
- Working Add to Cart (Shop, Home, Related Products, Single Product pages)
- Live cart item-count badge in the navbar
- Fully functional Cart page — add, update quantity, remove item, auto-calculated subtotal/total
- Fixed a pre-existing CSS bug where the cart icon button was unclickable

## Technologies Used
- Frontend: HTML5, CSS3, JavaScript (ES6+), Fetch API
- Backend: Node.js, Express.js
- Database: MongoDB (local instance), Mongoose
- Tools: Git, GitHub, Postman, VS Code

## Key Decisions Made This Module
- API responses follow a consistent format (`success`, `data`/`message`) across all routes.
- Admin routes (POST/PUT/DELETE) are currently open — will be protected with JWT middleware once Signup/Login is built in Module 3.
- Cart uses browser localStorage for now (no login required yet); will migrate to a backend Cart API tied to a logged-in user in Module 3.
- Kept frontend and backend fully separate (REST API architecture) — no EJS or server-side rendering.

## Module 2 Status: Complete (ahead of schedule)
All planned deliverables completed, plus working cart functionality that was
originally scoped for Module 3.

## Next Steps (Module 3 – Aug 03 – Aug 09, 2026)
- Implement backend Cart schema/API and migrate cart storage from localStorage to the database.
- Implement Signup/Login with JWT (bcrypt password hashing, protected routes).
- Connect the Contact form to a backend endpoint.
- Protect admin product routes with authentication middleware.