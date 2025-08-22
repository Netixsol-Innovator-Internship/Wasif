const express = require("express");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

module.exports = router;
