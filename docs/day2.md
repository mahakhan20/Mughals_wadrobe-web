# Day 2 – Wireframe Finalization & Folder Architecture
**Date:** July 21, 2026
**Module:** 1 (July 20 – July 26, 2026)

## Objective
Lock in the page structure from Day 1's wireframes, and design a clean,
scalable folder structure for both the frontend and backend before writing
any code.

## Work Completed

### 1. Wireframe Finalization
- Reviewed Day 1 wireframes and confirmed final layout decisions for each page:
  - **Home** — navbar, hero section, featured product cards, footer with contact info.
  - **Shop** — responsive grid (1 column on mobile, 2–3 on tablet, 4 on desktop).
  - **Product Details** — image on one side, details + "Add to Cart" on the other (stacked on mobile).
  - **Cart** — table layout on desktop, stacked cards on mobile.
  - **Signup/Login** — single centered card popup.
  - **About** — intro sections with image + text, alternating layout.
  - **Contact** — form on one side, contact info block on the other (stacked on mobile).
- Confirmed the page structure is final and ready to move into folder setup and coding.

### 2. Folder Architecture
Planned the following project structure:

```
ICT_Project/
├── client/        → frontend (HTML, CSS, JS, images, videos)
├── server/        → backend (Node.js, Express, MongoDB models/routes)
└── docs/          → daily progress logs
```

### 3. Naming & Structure Conventions
- **Files:** camelCase for JS files (e.g. `productController.js`), lowercase for HTML files.
- **Routes:** REST convention — `/api/products`, `/api/auth`, `/api/cart`, `/api/contact`.
- **Models:** PascalCase, singular (e.g. `Product`, `User`, `Cart`).
- **Environment variables:** kept in `.env`, never committed to GitHub (added to `.gitignore`).

## Decisions Made
- Separated concerns clearly on the backend: routes → controllers → models
  (MVC-style structure) for easier debugging and scaling.
- Grouped all progress documentation under a `docs/` folder, linked from the
  main README.

## Next Steps (Day 3)
- Set up the GitHub repository with this folder structure.
- Build the responsive Homepage.
