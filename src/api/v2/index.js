const router = require("express").Router();

router.use("/highscore", require("./highscore/index"));

module.exports = router;
