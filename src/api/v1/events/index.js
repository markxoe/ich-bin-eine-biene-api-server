const router = require("express").Router();
const validator = require("uuid").validate;
const events = require("../../../models/events");
const cors = require("cors");

const secrets = require("../../../secrets");

router.use(require("body-parser").json());

router.get("/get", async (req, res, next) => {
  const result = await events.find();
  res.status(200);
  res.send({ status: "ok", result });
});

router.all("/upload", async (req, res, next) => {
  if (
    req.body &&
    req.body.userid != undefined &&
    req.body.additionalBeeLength != undefined &&
    req.body.type
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
        const newEvent = new events({
          userid: req.body.userid,
          type: req.body.type,
          content: req.body.content,
          at: new Date().toLocaleString(),
        });

        newEvent.save();

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
