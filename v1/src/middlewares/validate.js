const httpStatus = require("http-status");
const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(
          error.isJoi
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR
        )
        .json({
          message: error.message,
        });
    }
  };
};

module.exports = validate;
