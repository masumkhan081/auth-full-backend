const express = require("express");
const app = express();
// require("dotenv").config();
// const initDB = require("./datatier/mongodb");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// // initialize the database
// initDB();

// // server creation
// const server = app.listen(process.env.PORT, () =>
//   console.log("listening at: ", process.env.PORT)
// );
// // middlewares
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // routes

// app.use("/auth", require("./routes/authRoutes"));
// // close the server
app.get("/quit", function (req, res) {
  res.send("closed"); 
});
// server closing endpoint; no need what so ever

app.listen(3000,()=>{
  console.log("running ...");
})
app.get("/", (req, res) => {
  res.send(`<a href="/quit">quit</a>`);
});
