const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    min: 6,
    max: 100,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

const UserDetails = mongoose.model("UserDetails", userSchema);

module.exports = UserDetails;
