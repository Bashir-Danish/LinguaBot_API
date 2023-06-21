export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  console.log(err.message);
  console.log(err.stack);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
export function catchAsync(theFucn) {
  return (req, res, next) => {
    Promise.resolve(theFucn(req, res, next)).catch(next);
  };
}
