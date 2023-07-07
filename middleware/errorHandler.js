const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const status = res.statuscode ? res.statuscode : 500;
  switch (status) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
    default:
      console.log("No error, all good!");
      break;
  }
};

module.exports = errorHandler;
