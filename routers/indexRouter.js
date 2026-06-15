const { Router } = require("express");
const indexController = require("../controllers/indexController");
const queries = require("../db/queries");

const router = Router();

router.get("/", indexController.getHomePage);

module.exports = router;
