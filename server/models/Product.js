const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Product", productSchema);
