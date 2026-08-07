const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { requireAuth } = require("../middleware/authMiddleware");

// Public - anyone can browse products
router.route("/").get(getAllProducts).post(requireAuth, createProduct);

router.route("/:id")
  .get(getProductById)
  .put(requireAuth, updateProduct)
  .delete(requireAuth, deleteProduct);

module.exports = router;