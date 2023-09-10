const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenSecret = process.env.JWT_SECRET;
const tokenHeaderKey = process.env.HEADER_KEY;

function cookieValidation(req, res, next) {
  const token = req.cookies[tokenHeaderKey];

  try {
    jwt.verify(token, tokenSecret)
      ? next()
      : res.status(401).send("fuck off !");
  } catch (err) {
    res.status(401).send("bad token !");
  }
}

module.exports = { cookieValidation };
