const Users = require("../models/Users");
const { comparePassword } = require("../scripts/utils/helper.js");
const JWT = require("jsonwebtoken");

const checkUser = async (email) => {
  const user = await Users.findOne({ email });
  return user;
};

const insert = async (user) => {
  const { name, email, password } = user;
  const newUser = new Users({ name, email, password });

  return await newUser.save();
};

const loginUser = async (user) => {
  const { email, password } = user;
};

module.exports = {
  insert,
  checkUser,
  loginUser,
};
