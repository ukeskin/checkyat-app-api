const joi = require("joi");

const createUserValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

module.exports = {
  createUserValidation,
  loginValidation,
};
