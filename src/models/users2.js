const mongoose = require("mongoose");
const usersv12 = mongoose.model(
  "usersv1.2",
  mongoose.Schema({
    _id: String,
    autoRotatingBeeLength: Number,
    additionalBeeLength: Number,
    multiplierLevel: Number,
    userName: String,
    lastUpdate: String,
    settingNewUI: Boolean,
    settingClickingAid: Boolean,
    userImage: String,
    goldenBienens: Number,
    level: Number,
    appVersion: String,
    platforms: String,
    dragons: Number,
  })
);

usersv12.createCollection();

module.exports = usersv12;
