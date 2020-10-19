const User = require("../model/user");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
module.exports = {
  Login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((sol) => {
        // console.log(sol)
        if (sol) {
          compare(req.body.password, sol.password)
            .then((isCompare) => {
              // console.log("I'm here under hash");
              if (isCompare) {
                if (sol.isLoggedIn === "True") {
                  res.json("You're alredy logged in");
                } else {
                  // const {_id,name,email} = User
                  sign(
                    { email: sol.email, id: sol._id },
                    process.env.SECRET_KEY,
                    { expiresIn: "1d" },
                    (err, token) => {
                      if (err) return res.status(500).json("server error");
                      User.findOneAndUpdate(
                        { email: req.body.email },
                        { $set: { isLoggedIn: true } },
                        { upsert: false }
                      )
                        .then(() => {
                          User.findById(sol._id)
                            .then((dar) => {
                              console.log("THis is dar from:", dar);
                              res.json({
                                message: "Logged in successfully",
                                token: token,
                                user: dar,
                              });
                            })
                            .catch((e) => {
                              console.log(e.message);
                            });
                        })
                        .catch((err) => {
                          res.json(err.message);
                        });
                    }
                  );
                }
              } else {
                return res.json({ message: "Invalid credential" });
              }
            })
            .catch((err) => {
              res.json(err.message);
            });
        } else {
          return res.json({ message: "Not a register user please signup !" });
        }
      })
      .catch((err) => {
        res.json(err.message);
      });
  },
};
