const express = require("express");
const router = express.Router();
const createMessage = require("../controllers/aiMessagesController");
const auth = require("../auth/userAuth");

router.post("/", auth, createMessage);

module.exports = router;
