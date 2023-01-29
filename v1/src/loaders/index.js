const { connectDB } = require("./db.js");

module.exports = () => {
  connectDB();
};
