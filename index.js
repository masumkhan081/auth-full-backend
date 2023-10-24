const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./src/data-tier/mongodb");
const { originControl } = require("./src/middleware/middlewares");

// initialize the database
initDB();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// 
app.use(cors({ origin: "https://auth-full.vercel.app", credentials: true }));
app.use(originControl);

// routes: login, register, recover, reset, verify, logout ...
app.use("/auth", require("./src/routes/auth"));

app.listen(3000, () => {
  console.log("running ...");
});

// // close the server
app.get("/quit", function (req, res) {
  res.send("closed");
});
// server closing endpoint; no need what so ever
app.get("/", (req, res) => {
  res.send(`<a href="/quit">quit</a>`);
});
