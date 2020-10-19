const User = require("../model/user");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
module.exports = {
  //   GetUser: (req, res) => {
  //     User.find()
  //       .then((user) => {
  //         res.json(user);
  //       })
  //       .catch((err) => {
  //         res.json({ message: err });
  //       });
  //   },
  user: (req, res) => {
    //check if email alredy exit
    User.findOne({ email: req.body.email })
      .then((sol) => {
        if (sol) {
          return res.json({ message: "Email alredy exist" });
        }
        // hash the password
        hash(req.body.password, 10)
          .then((hashedpassword) => {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedpassword,
            });
            //Save the user
            user
              .save()
              .then((data) => {
                // console.log(data);
                sign(
                  { email: data.email, user: data._id },
                  process.env.SECRET_KEY,
                  { expiresIn: "1h" },
                  (err, token) => {
                    if (err) return res.status(500).send("Server error");
                    User.update({ email: req.body.email }, { isLoggedIn: true })
                      .then((user) => {
                        // console.log(token);
                        User.findOne({ email: req.body.email })
                          .then((sol) => {
                            res.json({ token: token, user: sol });
                          })
                          .catch((err) => {
                            res.json({ message: err.message });
                          });
                      })
                      .catch((err) => {
                        res.json({ message: err.message });
                      });
                  }
                );
              })
              .catch((err) => {
                console.log(err.message);
                res.json({ message: err.message });
              });
          })
          .catch((err) => {
            console.log(err.message);
            res.json({ message: err.message });
          });
      })
      .catch((err) => {
        console.log(err.message);
        res.json({ message: err.message });
      });
  },

  //   teacher: (req, res) => {
  //     //check if email alredy exit
  //     User.findOne({ email: req.body.email })
  //       .then((sol) => {
  //         if (sol) {
  //           return res.json({ message: "Email alredy exit" });
  //         }
  //         // hash the password
  //         hash(req.body.password, 10)
  //           .then((hashedpassword) => {
  //             const user = new User({
  //               name: req.body.name,
  //               email: req.body.email,
  //               isTeacher: true,
  //               password: hashedpassword,
  //             });
  //             //Save the user
  //             user
  //               .save()
  //               .then((data) => {
  //                 // console.log(data)
  //                 sign(
  //                   { email: data.email, user: data._id },
  //                   process.env.SECRET_KEY,
  //                   { expiresIn: "1h" },
  //                   (err, token) => {
  //                     if (err) return res.status(500).send("Server error");
  //                     User.update({ email: req.body.email }, { isLoggedIn: true })
  //                       .then((user) => {
  //                         console.log(token);
  //                         res.json({ token: token, user: data });
  //                       })
  //                       .catch((err) => {
  //                         res.json({ message: err });
  //                       });
  //                   }
  //                 );
  //               })
  //               .catch((err) => {
  //                 res.json({ message: err });
  //               });
  //           })
  //           .catch((err) => {
  //             console.log(process.env.G_NAME);
  //             res.json({ message: err });
  //           });
  //       })
  //       .catch((err) => {
  //         res.json({ message: err });
  //       });
  //   },
};
