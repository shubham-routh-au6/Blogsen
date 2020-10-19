const express = require("express");
const router = express.Router();
const controller = require("../controller/userLoginCon");

router.post("/login", controller.Login);

module.exports = router;
