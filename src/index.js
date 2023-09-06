const app = require("express")();
require("dotenv").config();
const mongoose = require("mongoose");
const initDB = require("./datatier/mongodb");
const user = require("./model/user");

initDB();

const server = app.listen(process.env.PORT, () =>
  console.log("listening at: ", process.env.PORT)
);
app.get("/", (req, res) => {
  let u = new user({ email: "emal", password: "passme" });
  u.save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.send(`<a href="/quit">quit</a>`);
});
app.get("/quit", function (req, res) {
  res.send("closing..");
  server.close();
});

app.use("auth", require("./routes"));

/*
login
signup
reset
verification
profile
*/
