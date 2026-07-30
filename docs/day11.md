# Day 11 – Connecting Shop & Single Product Pages to Live Backend Data
**Date:** July 30, 2026
**Module:** 2, Day 4 (July 27 – Aug 02, 2026)

## Objective
Replace the static, hardcoded product listings on the Shop and Single
Product pages with real data fetched live from the backend API built in
Days 8–10.

## Work Completed

### 1. Shop Page (shop.html)
- Removed the hardcoded product cards from the page markup.
- Replaced them with a single empty container (`#shop-products`) that
  JavaScript populates on page load.
- Added `loadShopProducts()` in `script.js`, which:
  - Calls `GET /api/products`.
  - Dynamically builds a product card (image, category, name, star rating,
    price) for each product returned.
  - Links each card to `sproduct.html?id=<productId>`.
  - Shows a friendly message if the backend isn't running or no products
    exist yet (e.g. "Run `node seed.js`...").

### 2. Single Product Page (sproduct.html)
- Replaced hardcoded product name/price/description/image with placeholder
  elements (`#pd-name`, `#pd-price`, `#pd-description`, `#pd-category`,
  `#MainImg`) that get filled in dynamically.
- Added `loadSingleProduct()` in `script.js`, which:
  - Reads the product ID from the URL query string (`?id=...`).
  - Calls `GET /api/products/:id`.
  - Fills in the product details on the page.
  - Shows a clear message if no ID is passed, or if the product/backend
    isn't reachable.

### 3. Related Products
- Added `loadRelatedProducts()`, which fetches all products, filters out
  the current one, prioritizes items from the same category, and displays
  up to 4 related product cards below the main product.

### 4. Shared Rendering Logic
- Added a shared `buildProductCard()` helper in `script.js` so the Shop
  page and the Related Products section use identical, consistent card
  markup instead of duplicated code.

### 5. Error Handling
- Both pages now handle three states gracefully: loading, successfully
  loaded data, and failure (backend not running / network error) — instead
  of showing blank or broken content.

### 6. Add to Cart Functionality (pulled forward from Module 3 scope)
- Implemented a working cart using `localStorage` (`getCart`, `saveCart`,
  `addToCart`) so the "Add to Cart" buttons on the Shop page, Home page,
  Related Products, and Single Product page are now fully functional.
- Added a live cart-item-count badge on the navbar cart icon across all pages.
- Cart page (`cart.html`) now renders items dynamically from `localStorage`,
  supports updating quantity, removing an item, and automatically
  recalculates the subtotal/total.
- Note: this is a temporary local-storage cart for usability now. A full
  backend Cart API (schema + persistence tied to a logged-in user) is still
  planned for Module 3, and will replace this once auth is built.

### 7. Home Page Products
- Converted the Home page's "Featured Products" and "New Arrivals" sections
  from hardcoded HTML to live data as well, so every product across the
  entire site (Home, Shop, Related Products) links to a working, correctly
  populated Single Product page and has a functional Add to Cart button.

### 8. Bug Fix
- Fixed a pre-existing CSS issue where the cart-icon link on product cards
  was effectively unclickable (the `<a>` collapsed to zero size because its
  only child was absolutely positioned). The anchor itself is now
  positioned and sized correctly, so it's clickable across all breakpoints.

## Decisions Made
- API base URL is defined once as a constant (`API_BASE_URL` in
  `script.js`) for easy updating later (e.g. when a real deployment URL
  is needed, even though this project stays local for now).
- Cart persistence uses `localStorage` for now (no login required yet);
  it will be migrated to the backend Cart API once Signup/Login (JWT) is
  built in Module 3.

## Next Steps (Module 3 – Aug 03 – Aug 09, 2026)
- Implement backend Cart schema/API and migrate cart storage from
  `localStorage` to the database, tied to a logged-in user.
- Implement Signup/Login with JWT.
- Connect the Contact form to a backend endpoint.
