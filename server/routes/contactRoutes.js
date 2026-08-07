const express = require("express");
const router = express.Router();
const { submitContact, getAllContacts } = require("../controllers/contactController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", submitContact);              // public - anyone can send a message
router.get("/", requireAuth, getAllContacts);  // protected - viewing messages requires login

module.exports = router;