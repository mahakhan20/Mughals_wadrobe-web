const mongoose = require("mongoose");

// Connects to a LOCAL MongoDB instance (no MongoDB Atlas, no deployment).
// Make sure MongoDB is running locally before starting the server, e.g.:
//   mongod --dbpath /path/to/your/data/db
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopsphere";
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected (local): ${mongoUri}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
