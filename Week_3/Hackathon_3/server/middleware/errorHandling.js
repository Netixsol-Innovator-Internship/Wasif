module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    data: null,
    message: err.message || 'Internal Server Error'
  });
};
