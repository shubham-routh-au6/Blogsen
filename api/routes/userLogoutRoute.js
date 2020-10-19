const express = require("express");
const controller = require("../controller/userLogoutCon");
const middleware = require("../middleware/auth");
const route = express.Router();

route.post("/logout", middleware.auth, controller.logout);

module.exports = route;
