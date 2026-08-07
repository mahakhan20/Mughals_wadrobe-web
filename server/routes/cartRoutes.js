const express = require("express");
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cartController");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.route("/").get(getCart).delete(clearCart);
router.post("/add", addItem);
router.route("/item/:productId").put(updateItem).delete(removeItem);

module.exports = router;