// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = {
  protect: (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        _id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "superAdmin") {
      return next();
    }
    return res.status(403).json({ message: "Access denied: Admins only" });
  },
};
