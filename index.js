require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const apiHandler = require("./src/api/index");

const morgan = require("morgan");

if (process.env.mongouri == undefined) {
  console.log("Error: No MongoURI set");
  throw Error("No MongoURI set");
}

const secrets = require("./src/secrets");
if (
  secrets.deleteApiKey == undefined ||
  secrets.insertApiKey == undefined ||
  secrets.usersApiSecret == undefined
) {
  console.log("Secret Missing");
  throw Error("Secret Missing");
}

mongoose.connect(process.env.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("combined"));

app.get("/", (req, res, next) => {
  res.send(
    "Die API ist nichts für kleine Kinder, aber scheue nicht Kontakt mit dem Entwickler aufzunehmen"
  );
});

app.use("/api", apiHandler);

app.listen(4000, () => {
  console.log("Listening for clients lol");
});
