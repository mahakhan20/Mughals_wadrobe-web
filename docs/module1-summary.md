# Module 1 – Summary Report
**Timeline:** July 20 – July 26, 2026
**Project:** ShopSphere – Full-Stack Responsive E-Commerce Web Application
**Intern:** Maha Khan (ZYNVEX-CERT-0506)

## Module Objective
Module 1 focused on laying the foundation of ShopSphere — from planning and
wireframing to building all static, fully responsive frontend pages, and
initializing the backend server and local database connection, ready for
API development in Module 2.

## Day-Wise Summary

| Day | Date | Focus | Details |
|---|---|---|---|
| Day 1 | Jul 20 | Requirement gathering & wireframing | [docs/day1.md](day1.md) |
| Day 2 | Jul 21 | Wireframe finalization & folder architecture | [docs/day2.md](day2.md) |
| Day 3 | Jul 22 | Repo setup + Homepage development | [docs/day3.md](day3.md) |
| Day 4 | Jul 23 | Cart, About & Contact pages | [docs/day4.md](day4.md) |
| Day 5 | Jul 24 | Shop, Single Product & Signup pages | [docs/day5.md](day5.md) |

## What Was Built

### Frontend Pages (all responsive — mobile, tablet, desktop)
- **Home** (`index.html`) — navbar, hero section, featured products, footer
- **Shop** (`shop.html`) — responsive product grid
- **Single Product** (`sproduct.html`) — product detail view with Add to Cart
- **Cart** (`cart.html`) — item list, quantity controls, order summary
- **Signup/Login** (`signup.html`) — popup-style auth form
- **About** (`about.html`) — store introduction and mission
- **Contact Us** (`contact.html`) — contact form + store info

### Backend Setup
- Node.js + Express server initialized (`server.js`)
- Local MongoDB connection configured (`config/db.js`)
- Base folders ready for Module 2: `models/`, `controllers/`, `routes/`, `middleware/`

### Project Structure
```
ICT_Project/
├── client/        → HTML, CSS, JS (all 7 pages)
├── server/        → Express server, DB config
├── docs/          → Daily progress logs (day1–day7)
└── README.md
```

---

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local instance)
- **Tools:** Git, GitHub, VS Code


## Key Decisions Made This Module
- Frontend and backend kept fully separate (REST API architecture).
- All pages designed mobile-first, with a working hamburger navigation menu.
- MongoDB running locally — no MongoDB Atlas or live deployment.
- Backend organized in MVC-style structure (routes / controllers / models)
  for clean separation of logic ahead of Module 2.

## Module 1 Status: Complete

## Next Steps (Module 2 – July 27 – Aug 02, 2026)
- Design MongoDB schemas (Product, User) using Mongoose.
- Build REST APIs for products (GET all, GET single, admin CRUD).
- Connect Shop and Single Product pages to live backend data.
- Add input validation and error handling.
