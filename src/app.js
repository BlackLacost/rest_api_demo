const express = require("express");

const app = express();

const { UserController } = require("./modules/user/user.module");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    appname: "api",
    version: "v1",
    status: "up"
  });
});

app.use("/api/v1/users", UserController);

module.exports = app;
