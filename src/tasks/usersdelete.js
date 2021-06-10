const users = require("../models/users2");
const cron = require("cron");

module.exports = new cron.CronJob("0 0 * * * *", () => {
  users
    .find()
    .exec()
    .then((v) => {
      const deletableUsers = v
        .map((i) => ({
          data: i,
          timeSinceLastUpdateMS: Date.now() - new Date(i.lastUpdate).getTime(),
        }))
        .filter((i) => i.timeSinceLastUpdateMS > 10 * 7 * 24 * 60 * 60 * 1000);
      if (deletableUsers.length > 0)
        console.log(`Deleting ${deletableUsers.length} Users`);
      deletableUsers.forEach((i) => i.data.delete());
    });
});
