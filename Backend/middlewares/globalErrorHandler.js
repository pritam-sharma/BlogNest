const globalErrorHandler = (err, req, res, next) => {
  const status = err?.status ? err.status : "failed";
  const message = err?.message;
  const stack = err?.stack;
  res.status(500).json({ status, message, stack });
};
const notFound = (req, res, next) => {
  let error = new Error(
    `Can't find the route for ${req.originalUrl} on this server!`
  );
  next(error);
};
module.exports = {globalErrorHandler, notFound}
