# Day 9 – Product API (GET Routes)
**Date:** July 28, 2026
**Module:** 2 (July 27 – Aug 02, 2026)

## Objective
Build and test the read-only Product API endpoints so the frontend can
start fetching real product data.

## Work Completed

### 1. Product Controller (controllers/productController.js)
- Created `getAllProducts()` — fetches and returns all products from MongoDB,
  sorted by newest first.
- Created `getProductById()` — fetches a single product by its MongoDB ID,
  with graceful handling of invalid ID formats.

### 2. Product Routes (routes/productRoutes.js)
- Set up routes:
  - `GET /api/products` → returns all products
  - `GET /api/products/:id` → returns a single product

### 3. Testing
- Verified both endpoints return a consistent JSON response format:
  `{ success: true, data: ... }`.
- Verified error handling for an invalid/non-existent product ID
  (returns a proper 400/404 response instead of crashing the server).

## Decisions Made
- API responses follow a consistent JSON format across all endpoints.
- Error responses also follow a consistent format: `{ success: false, message: ... }`.

## Next Steps (Day 10)
- Build admin routes (create/update/delete product).
