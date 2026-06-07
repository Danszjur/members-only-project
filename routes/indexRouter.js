const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/msg-wall", (req, res) => {
  res.send("msg wall");
});

module.exports = indexRouter;
