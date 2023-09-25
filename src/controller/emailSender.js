require("dotenv").config(); 
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const tokenSecret = process.env.JWT_SECRET;
const tokenHeaderKey = process.env.HEADER_KEY;
const userModel = require("../model/user");

function getVerificationMessage() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return `<h4 style="color:blue;text-align:center;">Please copy or type the OTP provided below: <br><br>${OTP}  `;
}

function getRecoveryMessage(existence) {
  return (
    `<h4 style="color:blue;text-align:center;">Please click the link to reset your password: </h4><br><br>${process.env.BASE_URL}/auth/recovery/` +
    `${CryptoJS.AES.encrypt(
      JSON.stringify({ id: existence.id, email: existence.email }),
      tokenSecret
    ).toString()}`
  );
}

const setSubject = (actType) =>
  actType == "recovery"
    ? "Auth-Full: Recover Your Password"
    : actType == "verification"
    ? "Auth-Full: Verify Your Email"
    : "";

async function sendMail({ email, res, actType }) {
  const existence = await userModel.findOne({ email: email }).exec();

  if (existence) {
    const mailOptions = {
      from: process.env.SENDER,
      to: email,
      subject: setSubject(actType),
      html:
        actType == "recovery"
          ? getRecoveryMessage(existence)
          : actType == "verification"
          ? getVerificationMessage()
          : "",
      // "<h4>Please type or paste the otp to verify your email: <br></h4>" +
      // `${OTP}`,
    };
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnAuthorized: true,
      },
    });

    transporter
      .sendMail(mailOptions)
      .then((result) => {
        console.log(`Message Sent: ${result.messageId}`);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      });
  } else {
    res.status(400).send("No Account with this mail");
  }
}

module.exports = {
  sendMail,
};
