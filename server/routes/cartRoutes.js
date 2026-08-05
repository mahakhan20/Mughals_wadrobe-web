const express = require("express");
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cartController");

router.route("/:sessionId").get(getCart).delete(clearCart);
router.route("/:sessionId/add").post(addItem);
router.route("/:sessionId/item/:productId").put(updateItem).delete(removeItem);

module.exports = router;