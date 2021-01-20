const router = require("express").Router();

const Settings = require("../../../models/settings");

const secrets = require("../../../secrets.json");
const { response } = require("express");

router.get("/get", async (req, res, next) => {
  const result = await Settings.find();
  res.status(200);
  res.send({ status: "ok", result: result.content });
});

router.get("/get/:id", async (req, res, next) => {
  const result = await Settings.findById(req.params.id);
  res.status(200);
  res.send({ status: "ok", result: result });
});

router.all("/insert", async (req, res, next) => {
  if (
    req.query.title &&
    req.query.content &&
    req.query.secret == secrets.insertApiKey
  ) {
    const newEntry = new Settings({
      _id: req.query.title,
      content: req.query.content,
    });
    Settings.create(newEntry);
    res.status(200);
    res.send({ status: "ok", new: newEntry });
  } else {
    res.status(400);
    res.send({ status: "error", reason: "Missing Parameter/wrong API Secret" });
  }
});

module.exports = router;
