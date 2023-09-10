const userModel = require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.JWT_SECRET;
const tokenHeaderKey = process.env.HEADER_KEY;

async function checkAndAddUser({ fullName, email, password, phone, res }) {
  // already registered or not
  const existence = await userModel.findOne({ email: email }).exec();

  if (existence) {
    res.status(400).send("Email is already in use");
  } else {
    const user = new userModel({ fullName, email, password, phone });
    const saved = await user.save();
    if (saved) {
      res.status(200).send({
        fullName,
        email,
        password,
        phone,
        message: "You may login now",
      });
    } else {
      res.status(400).send("Error creating account");
    }
  }
}

async function checkAndLoginUser({ email, password, res }) {
  // already registered or not
  const existence = await userModel.findOne({ email });

  if (existence) {
    // email and associated password matched
    if (existence.password === password) {
      console.log(tokenHeaderKey, "  <<<<    ", existence.id, tokenSecret);
      res
        .status(200)
        .cookie(tokenHeaderKey, jwt.sign(existence.id, tokenSecret), {
          expires: 100000 + Date.now(),
        })
        .send({
          email,
          message: "You are logged in",
        });
    }
    // email found but no match for password
    else {
      res.status(400).send("Wrong password");
    }
  }
  // no user with that email in system
  else {
    res.status(400).send("No account with that email");
  }
}

async function sendOTPMail({ email, res }) {}

async function updateNewPassword({}) {}

module.exports = { checkAndAddUser, checkAndLoginUser };
