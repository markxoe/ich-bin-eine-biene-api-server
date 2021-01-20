const mongoose = require("mongoose");

const Banns = mongoose.model(
  "bans",
  mongoose.Schema({
    _id: String,
    reason: String,
  })
);
Banns.createCollection();

module.exports = Banns;
