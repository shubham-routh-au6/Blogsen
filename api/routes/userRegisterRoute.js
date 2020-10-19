const express = require("express");
const router = express.Router();
const register = require("../controller/userRegisterCon");

// Get all data
// router.get("/users", register.GetUser);
// Register user
router.post("/register", register.user);
// router.post("/registerTeacher", register.teacher);

module.exports = router;
