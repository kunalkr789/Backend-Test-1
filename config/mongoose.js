const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/csv_upload");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function () {
  console.log("connected to database");
});

module.exports = db;
