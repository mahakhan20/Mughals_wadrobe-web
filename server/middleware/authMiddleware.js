// Placeholder for JWT authentication middleware.
// This will be implemented in Module 3 (Aug 03 - Aug 09, 2026) alongside
// user Signup/Login (bcrypt password hashing + JWT-based sessions).
//
// Once implemented, this middleware will:
//   1. Read the JWT from the Authorization header ("Bearer <token>")
//   2. Verify it using process.env.JWT_SECRET
//   3. Attach the decoded user to req.user
//   4. Call next(), or return 401 if the token is missing/invalid
//
// Example usage (once built):
//   router.post("/", protect, createProduct); // only logged-in users/admins

const protect = (req, res, next) => {
  // TODO: implement JWT verification in Module 3
  next();
};

module.exports = { protect };
