const User = require("../model/user");

const controller = {};

controller.logout = (req, res) => {
  const user = req.user;
  console.log("from line 7", user);
  User.update({ email: user.email }, { isLoggedIn: false })
    .then((userData) => {
      console.log("from line 10", userData);
      res.json({ message: "logged out successfully" });
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

module.exports = controller;
