const router = require("express").Router();
const validator = require("uuid").validate;
const users = require("../../../models/users2");
const userWarnings = require("../../../models/userwarnings");
const bans = require("../../../models/bans");
const cors = require("cors");

const secrets = require("../../../secrets");

router.use(require("body-parser").json());

router.get("/get", async (req, res, next) => {
  const result = await users.find();
  res.status(200);
  res.send({ status: "ok", result });
});

router.get("/deleteall", async (req, res, nect) => {
  if (req.query.secret == secrets.deleteApiKey) {
    await users.deleteMany();
    res.send({ status: "ok" });
  } else {
    res.send({ status: "fail", reason: "Missing Permission" });
  }
});

router.all("/leader", async (req, res, next) => {
  const all_bans = await bans.find();
  let bans_arr = [];
  bans_arr = all_bans.map((e) => e._id);
  const all_users = await users.find().sort({ level: "desc" });
  const all_levels = all_users
    .map((e) => ({
      user: e,
      level: e.level,
    }))
    .filter((e) => !bans_arr.includes(e.user._id));
  res.send(all_levels);
});

router.all("/ban/:id", async (req, res, next) => {
  const userid = req.params.id;
  const ban = await bans.findById(userid);
  if (ban) {
    res.status(200);
    res.send({ status: "ok", result: ban });
  } else {
    res.send({ status: "fail" });
  }
});

router.all("/warning/:id", async (req, res, next) => {
  const userid = req.params.id;
  const warning = await userWarnings.findById(userid).exec();
  if (warning) {
    res.status(200);
    res.send({ status: "ok", result: warning.message });
  } else {
    res.send({ status: "fail" });
  }
});

router.all("/update2", async (req, res, next) => {
  if (
    req.body &&
    req.body.userid != undefined &&
    req.body.autoRotatingBeeLength != undefined &&
    req.body.additionalBeeLength != undefined &&
    req.body.multiplierLevel != undefined &&
    req.body.userName != undefined &&
    req.body.settingNewUI != undefined &&
    req.body.settingClickingAid != undefined
  ) {
    if (
      require("crypto")
        .createHash("md5")
        .update(
          secrets.usersApiSecret +
            req.body.userid +
            req.body.additionalBeeLength
        )
        .digest("base64") == req.header("auth")
    ) {
      if (validator(req.body.userid)) {
        await users.updateOne(
          { _id: req.body.userid },
          {
            autoRotatingBeeLength: req.body.autoRotatingBeeLength,
            additionalBeeLength: req.body.additionalBeeLength,
            multiplierLevel: req.body.multiplierLevel,
            userName: req.body.userName,
            lastUpdate: new Date().toLocaleString(),
            settingNewUI: req.body.settingNewUI,
            settingClickingAid: req.body.settingClickingAid,
            userImage: req.body.userImage,
            goldenBienens: req.body.goldenBienens ? req.body.goldenBienens : 0,
            level:
              req.body.additionalBeeLength * 3 +
              req.body.multiplierLevel * 1 +
              (req.body.goldenBienens ? req.body.goldenBienens : 0) * 100000,
            appVersion: req.header("version"),
            platforms: req.header("platforms"),
          },
          { upsert: true }
        );
        res.send({ status: "ok" });
      } else {
        res.status(403);
        res.send({ status: "fail", error: "Userid false" });
      }
    } else {
      res.status(403);
      res.send({ status: "fail", reason: "No authentication" });
    }
  } else {
    res.status(400);
    res.send({
      status: "fail",
      error: "Missing Parameters",
    });
  }
});

module.exports = router;
