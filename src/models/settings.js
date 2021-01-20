const mongoose = require("mongoose");

const Settings = mongoose.model(
  "settings",
  mongoose.Schema({
    _id: String,
    content: String,
  })
);
Settings.createCollection();

module.exports = Settings;
