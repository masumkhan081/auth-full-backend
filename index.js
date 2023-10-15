const express = require("express");
const app = express();
require("dotenv").config();
const initDB = require("./src/data-tier/mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// initialize the database
initDB();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req,res,next)=>{
  res.header({ "Access-Control-Allow-Origin": "http://localhost:5173" })
  next();
})
app.use(cors({ origin: "http://localhost:5173" }));
//

// const whitelist = ['http://localhost:5173', 'http://blablabla.com'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
//       callback(new Error('Not allowed by CORS'));
//   }
// }
// app.use(cors(corsOptions));

// routes
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
