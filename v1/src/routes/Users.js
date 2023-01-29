const router = require("express").Router();
const { index, create, login } = require("../controllers/Users");
const {
  createUserValidation,
  loginValidation,
} = require("../validations/Users");
const validate = require("../middlewares/validate");
const { authenticateToken } = require("../middlewares/authenticate");

router.route("/").get(authenticateToken, index);
router.route("/").post(validate(createUserValidation), create);
router.route("/login").post(validate(loginValidation), login);

module.exports = { router };
