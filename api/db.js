const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Database connected successfully");
  })
  .catch(function (err) {
    console.log(err.message);
  });
