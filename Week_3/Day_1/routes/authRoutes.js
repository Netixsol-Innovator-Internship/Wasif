// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const { body } = require("express-validator");

// const router = express.Router();

// const validateRegister = [
//   body("name").notEmpty().withMessage("Name is required"),
//   body("email").isEmail().withMessage("Valid email is required"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 chars"),
// ];

// const validateLogin = [
//   body("email").isEmail().withMessage("Valid email is required"),
//   body("password").notEmpty().withMessage("Password is required"),
// ];

// router.post("/register", validateRegister, register);
// router.post("/login", validateLogin, login);

// module.exports = router;


