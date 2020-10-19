const express = require("express");
const controller = require("../controller/blogCon");
const middleware = require("../middleware/auth");
const route = express.Router();

route.post("/postBlog", middleware.auth, controller.postBlog);
route.get("/allBlog", controller.allBlog);
route.get("/userBlog", middleware.auth, controller.userBlog);
route.post("/editBlog", middleware.auth, controller.editBlog);
route.post("/deleteBlog", middleware.auth, controller.deleteBlog);

module.exports = route;
