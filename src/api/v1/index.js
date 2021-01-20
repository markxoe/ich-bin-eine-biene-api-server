/**
 * Handles the API v1 functions (infos, users)
 */
const router = require("express").Router();

const InfoHandler = require("./Infos/index");
const userHandler = require("./users/index");
const user2Handler = require("./users2/index");
const eventsHandler = require("./events/index");
const SettingsHandler = require("./settings/index");

router.get("/", (req, res) => {
  res.send(
    "Sachen die du machen kannst: /api/v1/infos oder /api/v1/users oder /api/v1/users2"
  );
});

router.use("/infos", InfoHandler);
router.use("/users", userHandler);
router.use("/users2", user2Handler);
router.use("/events", eventsHandler);
router.use("/settings", SettingsHandler);

module.exports = router;
