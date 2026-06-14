const { validationResult } = require("express-validator");
const queries = require("../db/queries");

function getSignUp(req, res) {
    res.render("sign-up", {
        title: "Sign Up",
        errors: [],
        formData: {},
    });
};

async function postSignUp(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
            title: "Sign Up",
            errors: errors.array(),
            formData: req.body,
        });
    }

    const result = await queries.testConnection();
    console.log("Database time: ", result);


    res.send("Sign up form submitted. Check the terminal.");

};

function getLogIn(req, res) {
    res.render("log-in", { title: "Log In" });
};

module.exports = {
    getSignUp,
    postSignUp,
    getLogIn,
}