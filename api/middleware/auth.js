const User = require("../model/user");
const { verify } = require("jsonwebtoken");

var middleware = {};

middleware.auth = async (req, res, next) => {
  var authToken = req.header("Authorization");
  console.log("from auth", authToken);
  if (authToken === "null") {
    console.log("Coming to an end");
    return res.status(401).json({ message: "You're not signed in" });
  }

  if (authToken) {
    try {
      const decode = verify(authToken, process.env.SECRET_KEY);

      const user = await User.findOne({
        email: decode.email,
      });

      if (user.isLoggedIn) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "You're not signed in" });
      }
    } catch (e) {
      return res.json({ message: e.message });
    }
  }
  //   else if (authToken === "null") {
  //     console.log("Coming to an end");
  //     return res.status(401).json({ message: "You're not signed in" });
  //   }
};

module.exports = middleware;
