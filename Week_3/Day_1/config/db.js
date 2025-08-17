// const mongoose = require("mongoose");

// let isConnected = false; // track connection state

// const connectDB = async () => {
//   if (isConnected) {
//     return;
//   }
//   try {
//     const conn = await mongoose.connect(process.env.MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = conn.connections[0].readyState;
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//     throw err;
//   }
// };

// module.exports = connectDB;
