const httpStatus = require("http-status");
const { insert, checkUser, loginUser } = require("../services/Users.js");
const { passwordToHash } = require("../scripts/utils/helper.js");
const JWT = require("jsonwebtoken");

const index = async (req, res) => {
  return res
    .json({
      message: "Welcome to the Node API",
      user: {
        id: req.user.id,
      },
    })
    .status(httpStatus.OK);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  user.password = passwordToHash(password);

  const userExists = await checkUser(email);

  if (userExists) {
    return res
      .json({ message: "User already exists" })
      .status(httpStatus.CONFLICT);
  }

  try {
    const result = await insert(user);
    return res.json(result).status(httpStatus.CREATED);
  } catch (error) {
    return res.json(error).status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };

  const userExists = await checkUser(email);

  if (!userExists) {
    return res.json({ message: "User not found" }).status(httpStatus.NOT_FOUND);
  }

  const token = JWT.sign(
    {
      id: userExists.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 300,
    }
  );

  return res.json({ auth: true, token }).status(httpStatus.OK);
};

module.exports = {
  create,
  index,
  login,
};
