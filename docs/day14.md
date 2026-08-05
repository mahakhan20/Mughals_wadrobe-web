# Day 14 – Signup Backend (bcrypt Password Hashing)
**Date:** August 5, 2026
**Module:** 3, Day 3 (Aug 03 – Aug 09, 2026)

## Objective
Allow users to create an account, with passwords securely hashed before
being stored — the first piece of the authentication system.

## Work Completed
- Installed `bcryptjs`.
- Created `controllers/authController.js` with `signupUser`:
  - Validates required fields and a minimum password length.
  - Checks for an existing account with the same email (409 if found).
  - Hashes the password with bcrypt before saving.
  - Returns the created user's basic info (never the password/hash).
- Created `routes/authRoutes.js`, mounted at `/api/auth` in `server.js`.
- Connected the Signup form (`signup.html`) to `POST /api/auth/signup`.
- Verified: valid signup, duplicate email rejection, missing-field
  validation, short-password validation, and confirmed the password is
  stored as a bcrypt hash, not plain text.

## Decisions Made
- Login (JWT) is intentionally left for the next step — Signup needed to
  be confirmed working first.

## Next Steps (Day 15)
- Implement Login with JWT-based sessions.
- Begin protecting admin product routes with auth middleware.