const express = require("express");
require("dotenv").config();
require("./db");
const cors = require("cors");
const app = express();

//Importing routes
const loginRoute = require("./routes/userLoginRoute");
const registerRoute = require("./routes/userRegisterRoute");
const logoutRoute = require("./routes/userLogoutRoute");
const postBlogRoute = require("./routes/blogRoute");

// Port declaration
const PORT = process.env.PORT || 8080;

//Cors config
var whitelist = ["http://localhost:3000", "https://blogsen.netlify.app"];

var corsOptions = {
  credentials: true, //to allow cookes from front-end
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loginRoute);
app.use(registerRoute);
app.use(postBlogRoute);
app.use(logoutRoute);

// Testing Route
app.get("/", (req, res) => {
  res.send("<h1>Hello we are in Main route</h1>");
});

app.listen(PORT, () => console.log(`Server is up at port ${PORT}`));
