const cors = require("cors");
const express = require("express");
const taskRouter = require("../routes/tasks");
const authRouter = require("../routes/authRoutes");
const errorHandler = require("../middleware/errorHandling");
require("dotenv").config();
const connectDB = require("../config/db");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "POST, OPTIONS, PATCH, PUT, GET, DELETE",
  })
);

// Connect to DB once (not on every request)
connectDB();

// Test route
app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

// Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", authRouter);

// Error handling middleware
app.use(errorHandler);

// Export app for Vercel serverless
app.listen(5000, () => {
  console.log(`Server Running at ${5000}`);
});

module.exports = app;
