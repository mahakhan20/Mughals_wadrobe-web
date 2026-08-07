# Day 16 – Contact Backend, Navbar Login State & Protected Admin Routes
**Date:** August 8, 2026
**Module:** 3, Day 6 (Aug 03 – Aug 09, 2026)

## Objective
Close out the remaining Module 3 deliverables: a working Contact form
backend, a logged-in navbar state, and protecting admin product routes
so only logged-in users can modify the catalog.

## Work Completed

### 1. Contact Form Backend
- Added `models/Contact.js` (name, email, subject, message).
- Added `controllers/contactController.js`:
  - `submitContact` — validates all fields and a proper email format,
    then saves the message. Public endpoint.
  - `getAllContacts` — lists all submitted messages, for admin use.
    Protected with `requireAuth`.
- Added `routes/contactRoutes.js`, mounted at `/api/contact`.
- Connected the Contact form (`contact.html`) to `POST /api/contact`,
  with inline success/error messaging.

### 2. Navbar Login State
- Added `updateNavbarAuthState()` in `script.js`, which runs on every
  page load: if a user is logged in (`shopsphere_user` in localStorage),
  the "Sign In" nav link is replaced with "Hi, [Name]" and a Logout link.
- Logout clears the stored token/user and redirects to the homepage.
- Verified manually across pages — confirmed via browser console/Postman
  testing that protected routes correctly reject requests with no token
  and accept them with a valid one.

### 3. Protected Admin Product Routes
- Applied `requireAuth` middleware to `POST`, `PUT`, and `DELETE` on
  `/api/products` — creating, updating, or deleting a product now
  requires a valid login token. `GET` routes remain public so browsing
  still works for everyone, logged in or not.

### 4. Cart Redesign: Login Required (major change from Day 14)
- The original Day 14 design allowed guest carts (identified by a random
  `sessionId`) that would later merge into a user's account cart on login.
  This caused a real bug: the `sessionId`/`user` fields used
  `default: null` on a sparse unique index, which meant every cart
  explicitly stored `null` in whichever field wasn't set. Since an
  explicit `null` still counts as a value to MongoDB's sparse index, this
  caused duplicate key errors as soon as more than one cart existed —
  surfacing as "Could not load cart" in the browser.
- Rather than patch around it, the cart was redesigned to be simpler and
  more correct: **the cart now requires login entirely.** Guest carts and
  the merge-on-login step were removed.
  - `models/Cart.js` — `user` is now the only identifying field
    (`required: true, unique: true`), no more `sessionId`.
  - `routes/cartRoutes.js` — every cart route now runs `requireAuth`
    first; URLs simplified (`/api/cart`, `/api/cart/add`,
    `/api/cart/item/:productId`).
  - Frontend: clicking "Add to Cart" while logged out now shows an alert
    and redirects to the Signup/Login page. The Cart page shows "Please
    log in to view your cart" instead of trying to fetch anything.
- Verified this works correctly across multiple different user accounts —
  each user's cart is fully separate, confirmed via testing after
  clearing the old, corrupted `carts` collection from local MongoDB.

## Testing
- Verified with a full test suite: contact submission (valid, bad email,
  missing fields), viewing messages (blocked without login, works with
  it), admin product routes (create/update/delete blocked without login,
  work with a valid token, public browsing unaffected), and the
  redesigned cart (blocked entirely without login, correctly isolated
  between two different logged-in users).
- Manually re-verified end-to-end after the cart redesign: logged in as
  one user, added items, confirmed a second account saw an empty,
  separate cart.

## Module 3 Status: Complete
All planned deliverables (Cart API, Signup/Login with JWT, Contact
backend, responsive design) are done, plus admin route protection and
a corrected, fully login-based cart — both closing real gaps found
during development rather than in the original scope.

## Next Steps
- Final testing pass across the whole site before the Module 3 deadline
  (Aug 9).
- Push all changes to GitHub.