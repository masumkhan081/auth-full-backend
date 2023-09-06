const mongoose = require("mongoose");


module.exports = require("mongoose").model("user", require("mongoose").Schema({email:String,password:String}))