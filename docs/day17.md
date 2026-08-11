# Day 17 – Responsive Re-Test & Session Expiry Handling
**Date:** August 10, 2026
**Module:** 4, Day 1 (Aug 10 – Aug 15, 2026)

## Objective
Re-verify responsiveness across all pages now that real backend data and
login state exist, and fix a gap found earlier: the frontend never
checked whether a stored JWT had expired, so an old/dead token could sit
in localStorage showing a broken logged-in state.

## Work Completed

### 1. Session Expiry Handling
- Added `isTokenExpired()` - decodes a JWT's payload (base64) and checks
  its `exp` claim against the current time, without needing a library.
- Added `checkSessionValidity()`, which runs on every page load and clears
  the stored token/user if it's expired or malformed, so the navbar and
  cart correctly show a logged-out state instead of a broken one.
- Added `handleAuthError()` - if the backend itself returns 401 mid-session
  (token expired while browsing), the user is logged out, told their
  session expired, and redirected to log back in - wired into the cart
  fetch calls.
- Tested with three cases (expired token, valid token, garbage token) -
  all handled correctly.

### 2. Responsive Re-Test
- Re-tested Home, Shop, Single Product, Cart, Signup/Login, About, and
  Contact at 375px, 768px, and desktop.
- [Fill in: note anything found broken and how it was fixed - e.g. navbar
  wrapping once "Hi, [Name]" was added, cart layout with real variable-length
  product names.]

## Next Steps (Day 18)
- Fresh end-to-end setup test following the README from scratch.