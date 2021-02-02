/**
 * Handles all the API versions
 */
const router = require("express").Router();

const v1 = require("./v1/index");
const v2 = require("./v2/index");

router.use(require("cors")());

router.get("/", (req, res) => {
  res.send("Versionen der API: v1 in /api/v1");
});

router.use("/v1", v1);
router.use("/v2", v2);

module.exports = router;
