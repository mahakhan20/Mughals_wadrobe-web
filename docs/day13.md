# Day 13 – Connecting Cart Page to the Backend Cart API
**Date:** August 4, 2026
**Module:** 3, Day 2 (Aug 03 – Aug 09, 2026)

## Objective
Replace the temporary localStorage-based cart with the real Cart API built
on Day 10, so cart data is properly persisted in MongoDB.

## Work Completed
- Added `getSessionId()` in `script.js` — generates and stores a random
  guest session ID in localStorage (used only as an identifier, not to
  store cart data anymore).
- Rewrote `addToCart()` to call `POST /api/cart/:sessionId/add` instead of
  writing directly to localStorage.
- Rewrote `renderCartPage()` to fetch the cart from
  `GET /api/cart/:sessionId` and render it dynamically.
- Wired up quantity updates (`PUT /api/cart/:sessionId/item/:productId`)
  and item removal (`DELETE /api/cart/:sessionId/item/:productId`).
- Cart badge count now reflects the real backend cart on every page load.

## Decisions Made
- Kept the same HTML structure/IDs from the Module 2 cart implementation —
  only the data source changed, not the UI.

## Next Steps (Day 14)
- Build the Signup backend with bcrypt password hashing.