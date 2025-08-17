import cors from 'cors';
const express = require("express");
const taskRouter = require("../routes/tasks");
// const authRouter = require("../routes/authRoutes");
const errorHandler = require("../middleware/errorHandling");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
// require("dotenv").config();
// const connectDB = require("../config/db");

const app = express();
// app.use(express.json());
app.use(cors({ origin: '*' })); 

// Connect to DB once (not on every request)
// connectDB();

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

// Routes
app.use("/api/tasks", taskRouter);
// app.use("/api/users", authRouter);

// Error handling middleware
app.use(errorHandler);

// Export app for Vercel serverless
module.exports = app;
