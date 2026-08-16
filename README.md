# Ecommerce Management (Mughals Wardrobe) – E-Commerce Web Application

Full-stack, fully responsive e-commerce web application.
**Intern:** Maha Khan | **Internship ID:** ZYNVEX-CERT-0506

This is a **local development project** — no live deployment, no MongoDB Atlas.
Everything (frontend, backend, database) runs on your machine.

---

## Project Structure

```
MW_Project/
├── client/          → Frontend (HTML5, CSS3, JS, responsive design)
│   ├── index.html
│   ├── shop.html
│   ├── sproduct.html
│   ├── cart.html
│   ├── about.html
│   ├── contact.html
│   ├── signup.html
│   ├── style.css
│   ├── script.js
│   ├── images/
│   └── videos/
│
├── server/          → Backend (Node.js, Express, MongoDB - local)
│   ├── server.js
│   ├── seed.js
│   ├── config/db.js
│   ├── models/ (Product.js, User.js)
│   ├── controllers/productController.js
│   ├── routes/productRoutes.js
│   ├── middleware/authMiddleware.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## How to Run Locally

### 1. Start MongoDB locally
Make sure MongoDB Community Server is installed, then run:
```bash
mongod
```
(leave this running in its own terminal)

### 2. Set up and start the backend
```bash
cd server
npm install
cp .env.example .env      # then edit .env if needed
npm run dev                # or: npm start
```
The API will run at: `http://localhost:5000`

### 3. (Optional) Seed sample products
Populates your local database with the same products shown in the frontend:
bash
cd server
node seed.js


### 4. Open the frontend
Open `client/index.html` directly in your browser, or serve it with a tool
like VS Code's "Live Server" extension for the best experience.


## API Endpoints (Products)

| Method | Endpoint                    | Description                          | Auth Required |
|--------|------------------------------|---------------------------------------|----------------|
| GET    | `/api/cart`                  | Get the logged-in user's cart         | Yes |
| POST   | `/api/cart/add`               | Add an item to the cart               | Yes |
| PUT    | `/api/cart/item/:productId`   | Update an item's quantity             | Yes |
| DELETE | `/api/cart/item/:productId`   | Remove an item from the cart          | Yes |
| DELETE | `/api/cart`                   | Clear the entire cart                 | Yes |
| POST   | `/api/auth/signup`            | Create a new account                  | No |
| POST   | `/api/auth/login`             | Log in, returns a JWT                 | No |
| POST   | `/api/contact`                | Submit a contact message              | No |
| GET    | `/api/contact`                | View all messages (admin)             | Yes |
| GET    | `/api/products`               | Get all products                      | No |
| GET    | `/api/products/:id`           | Get a single product                  | No |
| POST   | `/api/products`               | Create a product (admin)              | Yes |
| PUT    | `/api/products/:id`           | Update a product (admin)              | Yes |
| DELETE | `/api/products/:id`           | Delete a product (admin)              | Yes |

Test these using **Postman** or **curl** while the server is running.

## Progress Log

## Final Project Report
- [Complete Module 1–4 Consolidated Report](docs/Final-Project-Report.md)

## Module 1 Progress
- [Day 1 – Requirement Gathering & Wireframing](docs/day1.md)
- [Day 2 – Wireframe Finalization & Folder Architecture](docs/day2.md)
- [Day 3 – Repo Setup & Homepage Development](docs/day3.md)
- [Day 4 – Cart, About & Contact Page Development](docs/day4.md)
- [Day 5 – Shop, Single Product & Signup Page Development](docs/day5.md)
- [Module 1 – Complete Summary Report](docs/module1-summary.md)

## Module 2 Progress
- [Day 6 – Product Schema Design](docs/day8.md)
- [Day 7 – Product API (GET Routes)](docs/day9.md)
- [Day 8 – Admin Product Routes](docs/day10.md)
- [Day 9 – Connecting Shop & Single Product Pages + Working Cart](docs/day11.md)
- [Module 2 – Complete Summary Report](docs/module2-summary.md)

## Module 3 Progress
- [Day 12 – Backend Cart API](docs/day12.md)
- [Day 13 – Connecting Cart Page to Backend](docs/day13-module3.md)
- [Day 14 – Signup Backend (bcrypt)](docs/day14.md)
- [Day 15 – Login (JWT) & Signup/Login Page](docs/day15.md)
- [Day 16 – Contact Backend, Navbar Login State, Protected Admin Routes & Cart Redesign](docs/day16.md)
- [Module 3 – Complete Summary Report](docs/module3-summary.md)

## Module 4 Progress
- [Day 17 – Responsive Re-Test & Session Expiry Handling](docs/day17.md)
- [Day 18 – Fresh End-to-End Setup Test](docs/day18.md)
- [Day 19 – Edge-Case & Error-Handling Pass](docs/day19.md)
- [Day 20 – Code Cleanup & Repository Organization](docs/day20.md)
- [Day 21 – Final Documentation Consolidation](docs/day21.md)
- [Day 22 – Final Push & Submission](docs/day22.md)
- [Module 4 – Complete Summary Report](docs/module4-summary.md)

## Known Limitations & Future Improvements
- This is a local development build only - no live/production deployment.
- No payment gateway integration - checkout captures shipping details
  only, no actual payment processing.
- Shipping is a flat rate (free on first order, Rs 200 after), not
  calculated from real courier/distance data.
- No "forgot password" / password reset flow.
- No admin dashboard - product management is done directly via the API
  (e.g. Postman) rather than through a UI, by design choice.

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+) — fully responsive (mobile, tablet, desktop)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local instance) with Mongoose
- **Tools:** Git, GitHub, Postman, VS Code, MongoDB Compass
