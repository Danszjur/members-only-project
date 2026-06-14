const { Router } = require("express");
const { body } = require("express-validator")

const authController = require("../controllers/authController")

const router = Router();

router.get("/sign-up", authController.getSignUp);

router.post("/sign-up", [
    body("firstname").
        trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ max: 100 })
        .withMessage("First name must be at most 100 characters"),

    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ max: 100 })
        .withMessage("Last name must be at most 100 characters"),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Please confirm your password")
        .custom((value, { req }) => {
            return value === req.body.password
        })
        .withMessage("Passwords do not match"),
],

    authController.postSignUp);

router.get("/log-in", authController.getLogIn);

module.exports = router