require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { sendOTPMail } = require("./email");
const userModel = require("../model/user");
const tokenHeaderKey = process.env.HEADER_KEY;
const tokenSecret = process.env.TOKEN_SECRET;

async function isUserValid(req, res) {
  if (req.cookies[tokenHeaderKey]) {
    const user = await userModel.findById(
      JSON.parse(req.cookies[tokenHeaderKey]).id
    );
    user
      ? res.status(200).send({ status: "success", data: user })
      : res.status(401).json("you are not logged in");
  }
}

function logout(res) {
  res.clearCookie(tokenHeaderKey);
  res.status(201).send("cleared. user logged out");
}

async function markValidated({ userEmail, userOTP, token, res }) {
  // decrypted otp and it's expiry time, which to be validated against user typed otp

  const { expireAt, otp, email } = JSON.parse(
    crypto.AES.decrypt(token, tokenSecret).toString(crypto.enc.Utf8)
  );
  console.log(expireAt, otp, email);
  if (new Date().getTime() > expireAt) {
    res.status(400).send({ message: "OTP expired" });
  } else if (userOTP === otp && userEmail === email) {
    (await userModel.findOneAndUpdate({ email }, { isVerified: true }))
      ? res.status(200).send({ message: "Account verified. You may login " })
      : res.status(400).send({ message: "Error verifying your account" });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
}

async function signup({ fullName, email, password, phone, res }) {
  // already registered or not
  const existence = await userModel.findOne({ email: email }).exec();

  if (existence.isVerified) {
    res.status(409).send("Email is already in use. Please log in");
  } else if (existence.isVerified == false) {
    sendOTPMail({
      user: existence,
      res,
      successMessage:
        "Account already exist. We sent an OTP to your email for verification.",
    });
  } else {
    const user = await new userModel({
      fullName,
      email,
      password,
      phone,
    }).save();
    user
      ? sendOTPMail({
          user,
          res,
          successMessage:
            "An OTP has been sent to your email for verification.",
        })
      : res.status(400).send("Error creating account");
  }
}

async function login({ email, password, res }) {
  // registered or not
  const user = await userModel.findOne({ email, password });

  if (user) {
    // email and associated password matched and verified
    if (user.isVerified) {
      console.log(tokenHeaderKey, "  <<<<    ", user.id, tokenSecret);
      res
        .status(200)
        .cookie(
          tokenHeaderKey,
          JSON.stringify({
            id: user.id,
          }),
          {
            expire: 360000 + Date.now(),
            // overwrite: true,
            // secure: true,
            // httpOnly: true,
            // resave: true,
            // SameSite: None,
          }
        )
        .send({
          email,
          message: "You are logged in",
        });
    }
    // email and associated password matched but not-verified
    else {
      sendOTPMail({
        user,
        res,
        successMessage:
          "Account not verified yet. We sent an OTP to your email for verification.",
      });
    }
  }
  // no user with that email in system
  else {
    res.status(400).send("Wrong Credentials");
  }
}

async function resetPw({ token, res }) {
  const data = jwt.verify(token, tokenSecret);
  if (data) {
    const { id, expireAt, email } = data;
    if (new Date().getTime() > expireAt) {
      res.status(400).send({ message: "Reset link expired" });
    } else {
      (await userModel.findById(id))
        ? res.status(200).send({ message: "ok " })
        : res.status(400).send({ message: "Invalid reset link" });
    }
  } else {
    res.status(400).send({ message: "Error processing link" });
  }
}

async function updatePw({ email, password, res }) {
  (await userModel.findOneAndUpdate({ email }, { password }))
    ? res.status(200).send({ message: "Password updated successfully " })
    : res.status(400).send({ message: "Error updating password" });
}

module.exports = {
  signup,
  login,
  logout,
  resetPw,
  updatePw,
  markValidated,
};
