const mongoose = require("mongoose");

const userWarnings = mongoose.model(
  "userWarnings",
  mongoose.Schema({
    _id: String,
    message: String,
  })
);
userWarnings.createCollection();

module.exports = userWarnings;
