const { Router } = require("express");
const messageController = require("../controllers/messageController");

const router = Router();

router.get("/new-message", messageController.getNewMessage);
router.post("/new-message", messageController.postNewMessage);
router.post("/messages/:id/delete", messageController.deleteMessage);

module.exports = router;
