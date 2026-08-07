const jwt = require("jsonwebtoken");

// Non-blocking: if a valid token is present, attaches req.userId.
// Otherwise the request continues as a guest.
const identifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET || "dev_secret_change_me");
      req.userId = decoded.id;
    } catch (error) {
      req.userId = null;
    }
  } else {
    req.userId = null;
  }
  next();
};

// Blocking: used only for the merge-cart route, which requires login.
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Login required" });
  }
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET || "dev_secret_change_me");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { identifyUser, requireAuth };