const express = require("express");

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.render("login");
});
authRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

module.exports = authRouter;
