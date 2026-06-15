const { validationResult } = require("express-validator");
const queries = require("../db/queries");
const bcrypt = require("bcryptjs");

function getSignUp(req, res) {
  res.render("sign-up", {
    title: "Sign Up",
    errors: [],
    formData: {},
  });
}

async function postSignUp(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      title: "Sign Up",
      errors: errors.array(),
      formData: req.body,
    });
  }

  try {
    const { firstName, lastName, username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await queries.createUser(
      firstName,
      lastName,
      username,
      passwordHash,
    );

    console.log("New user created: ", newUser);

    res.redirect("log-in");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while creating the user.");
  }
}

function getLogIn(req, res) {
  res.render("log-in", { title: "Log In" });
}

module.exports = {
  getSignUp,
  postSignUp,
  getLogIn,
};
