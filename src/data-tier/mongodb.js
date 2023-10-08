const { connect, set } = require("mongoose");
require("dotenv").config();

function initDB() {
  set("strictQuery", true);
  set("debug", process.env.MODE === "development");
  connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then((data) => console.log("db connected"))
    .catch((err) => console.log(err.message));
}

module.exports = initDB;
