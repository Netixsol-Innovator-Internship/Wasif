// config/db.js
const mongoose = require("mongoose");

let isConnected = null; // Track connection state across function calls

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO);
    isConnected = conn.connections[0].readyState;

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
