# Day 12 – Backend Cart API
**Date:** August 3, 2026
**Module:** 3, Day 1 (Aug 03 – Aug 09, 2026)

## Objective
Build a backend Cart API so cart data can eventually move off localStorage
and be properly persisted, ahead of connecting it to the frontend.

## Work Completed
- Created `models/Cart.js` — stores a `sessionId` (for guest carts, since
  login isn't built yet) and an array of items, each with a snapshot of
  product name/price/image plus quantity.
- Created `controllers/cartController.js` with full logic:
  - `getCart` — fetches or auto-creates a cart for a sessionId
  - `addItem` — adds a new item or merges quantity if it already exists
  - `updateItem` — updates an item's quantity
  - `removeItem` — removes a single item
  - `clearCart` — empties the whole cart
- Created `routes/cartRoutes.js` and mounted it at `/api/cart` in `server.js`.
- Verified all cart operations (add, merge duplicate, update, remove) work
  correctly using a controller-level logic test.

## Decisions Made
- Cart is tied to a guest `sessionId` (random ID generated in the browser)
  rather than a logged-in user, since Signup/Login isn't built yet. This
  will be upgraded to a real user-based cart once JWT auth exists.

## Next Steps (Day 13)
- Connect the Cart page (and Add to Cart buttons across the site) to this
  new backend API, replacing the temporary localStorage-based cart.