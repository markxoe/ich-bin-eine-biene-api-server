const router = require("express").Router();

const Infos = require("../../../models/infos");

const secrets = require("../../../secrets");
const { response } = require("express");

router.get("/get", async (req, res, next) => {
  const result = await Infos.find();
  res.status(200);
  res.send({ status: "ok", result: result });
});

router.get("/get/:id", async (req, res, next) => {
  const result = await Infos.findById(req.params.id);
  res.status(200);
  res.send({ status: "ok", result: result });
});

router.all("/insert", async (req, res, next) => {
  if (
    req.query.title &&
    req.query.content &&
    req.query.secret == secrets.insertApiKey
  ) {
    const newEntry = new Infos({
      title: req.query.title,
      content: req.query.content,
    });
    Infos.create(newEntry);
    res.status(200);
    res.send({ status: "ok", new: newEntry });
  } else {
    res.status(400);
    res.send({ status: "error", reason: "Missing Parameter/wrong API Secret" });
  }
});

module.exports = router;
