import mongoose from "mongoose";

let isConnected = false; // Track connection state

const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    if (!process.env.MONGO) {
      throw new Error("❌ MONGO connection string is not defined in .env");
    }

    const conn = await mongoose.connect(process.env.MONGO, {
      // These options are no longer required in modern mongoose versions
    });

    isConnected = conn.connections[0].readyState === 1; // 1 = connected
    console.log("✅ MongoDB Connected");
  } catch (err: any) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

export default connectDB;
