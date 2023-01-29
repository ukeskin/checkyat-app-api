const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(httpStatus.UNAUTHORIZED);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(httpStatus.FORBIDDEN);

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
