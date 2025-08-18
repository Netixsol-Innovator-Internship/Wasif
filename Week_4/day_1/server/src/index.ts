import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskRouter from "./routes/tasks";
import authRouter from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandling";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors()
);

// Connect to DB once (not on every request)
connectDB();

// Test route
app.get("/", (_req: Request, res: Response) => {
  return res.json({ hello: "world" });
});

// Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", authRouter);

// Error handling middleware
app.use(errorHandler);

// Start server (only if not in test mode)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// export default app;
