const cors = require("cors");
const express = require("express");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandling");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  return res.json({ Wasif: "Developer" });
});
app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use(errorHandler);
app.listen(5000, () => {
  console.log(`Server Running at ${5000}`);
});

module.exports = app;
