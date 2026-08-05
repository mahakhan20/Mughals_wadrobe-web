const Cart = require("../models/Cart");

const withTotals = (cart) => {
  const items = cart.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { _id: cart._id, sessionId: cart.sessionId, items, subtotal, total: subtotal };
};

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) cart = await Cart.create({ sessionId: req.params.sessionId, items: [] });
    res.status(200).json({ success: true, data: withTotals(cart) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch cart", error: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { productId, name, price, image, quantity } = req.body;
    if (!productId || !name || price === undefined) {
      return res.status(400).json({ success: false, message: "productId, name, and price are required" });
    }

    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) cart = new Cart({ sessionId: req.params.sessionId, items: [] });

    const qtyToAdd = quantity && quantity > 0 ? quantity : 1;
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) existingItem.quantity += qtyToAdd;
    else cart.items.push({ product: productId, name, price, image, quantity: qtyToAdd });

    await cart.save();
    res.status(200).json({ success: true, data: withTotals(cart) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add item to cart", error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "A valid quantity (1 or more) is required" });
    }
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, data: withTotals(cart) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update cart item", error: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    res.status(200).json({ success: true, data: withTotals(cart) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove cart item", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    cart.items = [];
    await cart.save();
    res.status(200).json({ success: true, data: withTotals(cart) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear cart", error: error.message });
  }
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };