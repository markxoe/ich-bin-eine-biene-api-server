const router = require("express").Router();

const users = require("../../../models/users2");
const userWarnings = require("../../../models/userwarnings");
const bans = require("../../../models/bans");
const cors = require("cors");

const secrets = require("../../../secrets");

const checkers = require("./checkers");
const validators = require("./validators");
const decryptor = require("./decryptor");

router.use(require("body-parser").json());

router.get("/get", async (req, res, next) => {
  const result = await users.find();
  res.status(200);
  res.send({ status: "ok", result });
});

router.post("/", async (req, res, next) => {
  // Test if every value needed is there
  if (checkers.postRequestBody(req.body) && checkers.postRequestHeaders(req)) {
    const dataRaw = req.body.data;
    const dataEncrypted = require("base-64").decode(dataRaw);
    const totp = req.body.totp;
    const chksum = req.body.chksum;

    // Check if Checksum and TOTP is correct
    if (
      validators.checksumChecker(dataRaw, chksum) &&
      validators.totpChecker(totp)
    ) {
      const data = await decryptor.decryptUpload(dataEncrypted);

      let _out = {
        userid: undefined,
        autoRotatingBeeLength: 0,
        additionalBeeLength: 0,
        multiplierLevel: 0,
        userName: undefined,
        settingClickingAid: false,
        settingNewUI: false,
        userImage: "",
        goldenBienens: 0,
      };
      _out = { ..._out, ...JSON.parse(data) };

      if (validators.userids(_out.userid)) {
        await users.updateOne(
          { _id: _out.userid },
          {
            autoRotatingBeeLength: _out.autoRotatingBeeLength,
            additionalBeeLength: _out.additionalBeeLength,
            multiplierLevel: _out.multiplierLevel,
            userName: _out.userName,
            lastUpdate: new Date().toLocaleString(),
            settingNewUI: _out.settingNewUI,
            settingClickingAid: _out.settingClickingAid,
            userImage: _out.userImage,
            goldenBienens: _out.goldenBienens,
            level:
              _out.additionalBeeLength * 3 +
              _out.multiplierLevel * 1 +
              _out.goldenBienens * 100000,
            appVersion: req.header("version"),
            platforms: req.header("platforms"),
          },
          { upsert: true }
        );
        res.send({ status: "ok" });
      } else {
        res.status(403);
        res.send({ status: "fail", error: "So weit, aber die ID verkackt?" });
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
