# Day 1 – Requirement Gathering & Wireframing
**Date:** July 20, 2026
**Module:** 1 (July 20 – July 26, 2026)

## Objective
Establish a clear understanding of what ShopSphere needs to do, and translate
that into rough page-level wireframes before any code is written.

## Work Completed

### 1. Requirement Gathering
- Reviewed the core purpose of the project: a full-stack, responsive
  e-commerce web application (frontend: HTML5, CSS3, JS; backend: Node.js,
  Express.js, MongoDB — local instance, no deployment).
- Identified the core entities the app needs to manage:
  - **Products** — name, description, price, quantity, image, category
  - **Users** — name, email, password (hashed), account creation date
  - **Cart** — items, quantities, computed totals, linked to a user/session
  - **Contact messages** — name, email, subject, message
- Defined functional requirements:
  - Users can browse all products on a Shop page.
  - Users can view full details of a single product.
  - Users can add/remove items and update quantities in a cart.
  - Users can sign up and log in (JWT-based sessions).
  - Users can submit a message via a Contact form.
- Defined non-functional requirements:
  - Fully responsive layout (mobile, tablet, desktop).
  - Clean REST API structure between frontend and backend.
  - Runs entirely locally — no production deployment required.

### 2. Wireframing
Sketched low-fidelity wireframes for the following pages:

| Page | Key Elements |
|---|---|
| Home | Navbar, hero banner, featured products section, footer |
| Shop | Product grid/list, filter/search (optional), navbar |
| Product Details | Product image, name, description, price, quantity selector, "Add to Cart" button |
| Cart | List of added items, quantity controls, remove item, total price, checkout button |
| Signup/Login | Signup form (name, email, password), Login form (email, password), toggle link between the two |
| About | Store introduction and mission statement |
| Contact | Form fields (name, email, subject, message), store contact info (email, phone, hours) |

### 3. User Flow Outline
```
Home → Shop → Product Details → Add to Cart → Cart → Signup/Login → (future: Checkout)
                                                              ↓
                                                          Contact Page
```

## Decisions Made
- Confirmed the app will use vanilla HTML/CSS/JS on the frontend, not a
  frontend framework.
- Confirmed MongoDB will run **locally** (no MongoDB Atlas, no deployment).
- Agreed on JWT for authentication instead of session cookies, for simplicity
  with a REST API structure.

## Next Steps (Day 2)
- Finalize wireframes based on today's sketches.
- Plan and set up the project folder structure (`client/` and `server/`).
