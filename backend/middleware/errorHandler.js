const { errorResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(
      res,
      409,
      `An account with this ${field} already exists.`,
    );
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, 422, "Validation failed", messages);
  }

  if (err.name === "CastError") {
    return errorResponse(res, 400, `Invalid ${err.path}: ${err.value}`);
  }

  return errorResponse(
    res,
    err.statusCode || 500,
    err.message || "Internal Server Error",
  );
};

module.exports = errorHandler;
