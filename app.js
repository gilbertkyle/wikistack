const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const path = require("path");
const { db } = require("./models");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.send(layout(""));
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const run = async () => {
  await db.sync({ force: true });
  app.listen(3000, () => {
    console.log(`App listening in port ${3000}`);
  });
};

run();
