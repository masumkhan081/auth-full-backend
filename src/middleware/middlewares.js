const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenSecret = process.env.JWT_SECRET;
const tokenHeaderKey = process.env.HEADER_KEY;
const userModel = require("../model/user");

function originControl(req, res, next) {
  //   http://localhost:5173
  res.header({ "Access-Control-Allow-Origin": "https://auth-full.vercel.app" });
  next();
}

async function authentication(req, res, next) {
  console.log(req.cookies[tokenHeaderKey]);
  if (req.cookies[tokenHeaderKey]) {
    (await userModel.findById(JSON.parse(req.cookies[tokenHeaderKey]).id))
      ? next()
      : res.status(401).json("authentication failed");
  } else {
    // res.status(401).send("fuck off !");
    res.status(401).json("you are not logged in");
  }
}

// const paramMiddleware = (myParam) => {
//   return (req, res, next) => {
//     next();
//   }
// }
// app.get('/', paramMiddleware('param'), (req, res) => { res.send('...'); });

async function authorization(req, res, next) {
  console.log(req.cookies[tokenHeaderKey]);
  if (req.cookies[tokenHeaderKey]) {
    (await userModel.findById(JSON.parse(req.cookies[tokenHeaderKey]).id))
      ? next()
      : res.status(401).json("authentication failed");
  } else {
    // res.status(401).send("fuck off !");
    res.status(401).json("you are not logged in");
  }
}

module.exports = { originControl };

//  401 - invalid credentials
//  403 - Forbidden - has valid credentials but not enough privileges
//  404 Not Found
//  400 - "The request could not be understood by the server - clients fault
//  409 Conflict - if the server will not process a request, not the client's fault
// 200 OK
// 201 Created
// 302 Found
