const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // only used locally

const taskRouter = require("./routes/tasks");
const authRouter = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandling");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// Connect DB once for serverless

// Routes
app.get("/", (req, res) => res.json({hello: "world"}));
app.use("/api/tasks", taskRouter);
app.use("/api/users", authRouter);

// Error middleware
// app.use(errorHandler);

module.exports = app;
