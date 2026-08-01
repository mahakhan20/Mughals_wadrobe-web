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

| Method | Endpoint              | Description              |
|--------|------------------------|---------------------------|
| GET    | `/api/products`        | Get all products          |
| GET    | `/api/products/:id`    | Get a single product      |
| POST   | `/api/products`        | Create a new product      |
| PUT    | `/api/products/:id`    | Update an existing product|
| DELETE | `/api/products/:id`    | Delete a product          |

Test these using **Postman** or **curl** while the server is running.

## Progress Log
- [Day 1 – Requirement Gathering & Wireframing](docs/day1.md)
- [Day 2 – Wireframe Finalization & Folder Architecture](docs/day2.md)
- [Day 3 – Repo Setup & Homepage Development](docs/day3.md)
- [Day 4 – Cart, About & Contact Page Development](docs/day4.md)
- [Day 5 – Shop, Single Product & Signup Page Development](docs/day5.md)
- [Module 1 – Complete Summary Report](docs/module1-summary.md)

## Module 2 Progress
- [Day 6 – Product Schema Design](docs/day6.md)
- [Day 7 – Product API (GET Routes)](docs/day7.md)
- [Day 8 – Admin Product Routes](docs/day8.md)
- [Day 9 – Connecting Shop & Single Product Pages + Working Cart](docs/day9.md)
- [Module 2 – Complete Summary Report](docs/module2-summary.md)

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+) — fully responsive (mobile, tablet, desktop)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local instance) with Mongoose
- **Tools:** Git, GitHub, Postman, VS Code, MongoDB Compass
