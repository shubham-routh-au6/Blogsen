const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
