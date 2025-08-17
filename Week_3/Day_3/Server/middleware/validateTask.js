const { body, validationResult } = require("express-validator");

const validateCreateTask = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateUpdateTask = [
  body("title").optional().isString().withMessage("Title must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
