const { Router } = require("express");
const memberControler = require("../controllers/memberController");

const router = Router();

router.get("/join-club", memberControler.getJoinClub);
router.post("/join-club", memberControler.postJoinClub);

module.exports = router;
