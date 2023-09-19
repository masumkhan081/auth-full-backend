const mongoose = require("mongoose");

module.exports = require("mongoose").model(
  "user",
  require("mongoose").Schema({
    fullName: String,
    phone: String,
    email: String,
    password: String,
    isVerified: Boolean
  })
);
