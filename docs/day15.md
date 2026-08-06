# Day 15 – Login (JWT) & Connecting the Signup/Login Page
**Date:** August 6, 2026
**Module:** 3, Day 4 (Aug 03 – Aug 09, 2026)

## Objective
Add a Login endpoint using JWT, and build a real Signup/Login page on the
frontend that connects to both the Login (new) and Signup (Day 12) backend
endpoints — since the site previously had no working signup or login form
at all.

## Work Completed

### 1. Login Endpoint (controllers/authController.js)
- Added `loginUser()`:
  - Validates that email and password were provided.
  - Looks up the user by email; returns a generic "Invalid email or
    password" (401) if no account exists — avoids revealing whether an
    email is registered.
  - Uses `bcrypt.compare()` to check the submitted password against the
    stored hash.
  - On success, signs a JWT (`jsonwebtoken`) containing the user's ID and
    email, valid for 7 days, using `JWT_SECRET` from `.env`.
  - Returns the token along with basic user info (never the password hash).
- Added `POST /api/auth/login` in `routes/authRoutes.js`.
- Installed `jsonwebtoken` and added `JWT_SECRET` to `.env`.

### 2. Signup/Login Page (signup.html) — rebuilt from scratch
- The previous `signup.html` only contained login-style fields and had no
  actual signup form and no working submission logic.
- Rebuilt the page with a tab toggle between **Log In** and **Sign Up**,
  matching the site's existing header/footer and color theme (`#088178`
  accent, `.normal` button style).
- Signup form fields: Full Name, Email, Password (min. 6 characters).
- Login form fields: Email, Password, Remember me, Forgot password link
  (link is a placeholder for now).

### 3. Frontend Wiring (script.js)
- Added `showAuthForm()` to toggle between the two forms and update the
  page heading/subheading.
- Added a submit handler for the Signup form → calls
  `POST /api/auth/signup`, shows success/error inline, then switches to
  the Login tab automatically on success.
- Added a submit handler for the Login form → calls
  `POST /api/auth/login`, stores the returned JWT and user info in
  `localStorage` (`web_token`, `web_user`) on success, then
  redirects to the homepage.

### 4. Testing
- Verified with a controller-level logic test:
  - Signup → Login with the correct password returns a valid token (200).
  - Login with an incorrect password returns 401.
  - Login with a non-existent email returns 401 (same generic message,
    not leaking which part was wrong).

## Decisions Made
- The JWT is stored in `localStorage` for now (`web_token`); this
  will be used in the next step to protect routes (e.g. admin product
  routes) and to show a logged-in state in the navbar.
- Password reset ("Forgot password?") is left as a placeholder link — not
  in scope for this module.

## Next Steps (Module 3, Day 5)
- Use the stored JWT to protect admin product routes
  (`middleware/authMiddleware.js`) so only logged-in users can create,
  update, or delete products.
- Show a logged-in state in the navbar (e.g. "Hi, Maha" instead of "Sign In").
- Connect the Contact Us form to a backend endpoint.