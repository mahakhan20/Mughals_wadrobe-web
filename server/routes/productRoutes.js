const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET /api/products        -> get all products
// POST /api/products       -> create a new product (admin)
router.route("/").get(getAllProducts).post(createProduct);

// GET /api/products/:id    -> get a single product
// PUT /api/products/:id    -> update a product (admin)
// DELETE /api/products/:id -> delete a product (admin)
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
