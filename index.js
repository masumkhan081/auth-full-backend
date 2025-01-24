const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./src/data-tier/mongodb");
const { originControl } = require("./src/middleware/middlewares");

// initialize the database
initDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(originControl);

// routes: login, register, recover, reset, verify, logout ...
app.use("/auth", require("./src/routes/auth"));

app.listen(3000, () => {
  console.log("running ...");
});

// server closing endpoint; no need what so ever
app.get("/Hi", (req, res) => {
  res.send("Hello");
});
