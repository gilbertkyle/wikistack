const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const path = require("path");
const { db } = require("./models");
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

app.get("/", (req, res, next) => {
  res.redirect('/wiki');
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 8080;

const run = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

run();
