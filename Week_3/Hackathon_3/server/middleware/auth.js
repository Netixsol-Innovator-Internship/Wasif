const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({
      message: "No Token Found",
    });
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decodeToken });
    req.user = { _id: decodeToken.id };
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
