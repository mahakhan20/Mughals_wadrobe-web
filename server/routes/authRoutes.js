const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/authController");

router.post("/signup", signupUser);
// Login (JWT) comes later in Module 3

module.exports = router;