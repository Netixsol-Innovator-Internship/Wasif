const express = require("express");
const taskRouter = require("../routes/tasks");
const errorHandler = require("../middleware/errorHandling");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res, next) => {
  return res.json({ hello: "world" });
});
app.use("/api/tasks", taskRouter);
app.use(errorHandler);

module.exports = app;

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server Running on http://localhost:${PORT}`);
// });
