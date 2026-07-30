// Run this once to populate your local MongoDB with sample products
// that match the ones already shown in the frontend (client/index.html, shop.html).
//
// Usage:
//   node seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const sampleProducts = [
  { name: "Charms Bracelet", description: "Stainless steel charms bracelet, golden finish.", price: 1799, quantity: 25, image: "f1.jpeg", category: "Bracelet" },
  { name: "Handbag", description: "Crystal beaded handbag, sky blue.", price: 5999, quantity: 10, image: "f2.jpeg", category: "Bags" },
  { name: "Charms Bracelet", description: "Stainless steel charms bracelet, golden finish.", price: 1999, quantity: 20, image: "f3.jpeg", category: "Bracelet" },
  { name: "Locket", description: "Stainless steel golden locket.", price: 1200, quantity: 30, image: "f4.jpeg", category: "Necklace" },
  { name: "Ear-rings", description: "Stainless steel golden ear-rings.", price: 999, quantity: 40, image: "f5.jpeg", category: "Earrings" },
  { name: "Pearl Bracelet", description: "Stainless steel pearl bracelet.", price: 799, quantity: 35, image: "f6.jpeg", category: "Bracelet" },
  { name: "Polymer Bracelet", description: "Elastic polymer beads bracelet.", price: 1199, quantity: 28, image: "f7.jpeg", category: "Bracelet" },
  { name: "Shells Mobile Cover", description: "Handmade shell-decorated mobile case.", price: 2750, quantity: 15, image: "f8.jpeg", category: "Accessories" },
  { name: "Handbag", description: "Crystal beaded handbag.", price: 5999, quantity: 12, image: "n1.jpeg", category: "Bags" },
  { name: "Pearl Charm Bracelet", description: "Pearl and stainless steel charm bracelet.", price: 1799, quantity: 18, image: "n2.jpeg", category: "Bracelet" },
  { name: "White Bracelet", description: "White beaded bracelet.", price: 699, quantity: 22, image: "n3.jpeg", category: "Bracelet" },
  { name: "Green Bracelet", description: "Crystal beaded green bracelet.", price: 599, quantity: 26, image: "n4.jpeg", category: "Bracelet" },
  { name: "Shells Bracelet", description: "Stainless steel and silver shells bracelet.", price: 1499, quantity: 19, image: "n5.jpeg", category: "Bracelet" },
  { name: "Polymer Bracelet", description: "Elastic polymer beads bracelet.", price: 399, quantity: 32, image: "n6.jpeg", category: "Bracelet" },
  { name: "Charm Bracelet", description: "Stainless steel charm bracelet.", price: 1799, quantity: 14, image: "n7.jpeg", category: "Bracelet" },
  { name: "Charm Bracelet", description: "Pink charms bracelet.", price: 999, quantity: 21, image: "n8.jpeg", category: "Bracelet" },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Product.deleteMany({});
    console.log("Existing products cleared.");

    const created = await Product.insertMany(sampleProducts);
    console.log(`${created.length} sample products inserted successfully.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDB();
