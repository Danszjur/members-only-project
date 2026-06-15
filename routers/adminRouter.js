const { Router } = require("express");
const adminController = require("../controllers/adminController");

const router = Router();

router.get("/admin", adminController.getAdminPage);
router.post("/admin", adminController.postAdminPage);

module.exports = router;
