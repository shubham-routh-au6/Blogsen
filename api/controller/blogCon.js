const Blog = require("../model/blog");

const controller = {};

controller.allBlog = (req, res) => {
  return new Promise((resolve, reject) => {
    Blog.find({}, {}, { sort: { _id: -1 } }, function (err, obj) {
      resolve(obj);
      res.status(200).json({ data: obj });
    });
  });
};

controller.userBlog = (req, res) => {
  const user = req.user;

  return new Promise((resolve, reject) => {
    Blog.find({ owner: user._id }, {}, { sort: { _id: -1 } }, function (
      err,
      obj
    ) {
      resolve(obj);
      console.log(obj);
      res.status(200).json({ data: obj });
    });
  });
};

controller.editBlog = (req, res) => {
  const user = req.user;
  const imageUrl = req.body.imageUrl ? req.body.imageUrl : "";
  const videoUrl = req.body.videoUrl ? req.body.videoUrl : "";
  console.log("This is the latest", req.body.id);
  Blog.findById(req.body.id)

    .then((data) => {
      console.log("This is after latest", data);
      data
        .update({
          title: req.body.title,
          body: req.body.body,
          imageUrl,
          videoUrl,
        })
        .then((res) => {
          Blog.findById(req.body.id)
            .then((data) => {
              console.log("This is the updatedData", data);
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err.message));
      res.json({ message: "updated successfully" });
    })
    .catch((e) => console.log(e.message));
};

controller.postBlog = (req, res) => {
  const user = req.user;
  const imageUrl = req.body.imageUrl ? req.body.imageUrl : "";
  const videoUrl = req.body.videoUrl ? req.body.videoUrl : "";
  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    owner: user._id,
    imageUrl,
    videoUrl,
    name: user.name,
  });
  blog
    .save()
    .then((data) => {
      console.log("This is saved blog:", data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err.message));
};
controller.deleteBlog = (req, res) => {
  const user = req.user;
  console.log(req.body);
  Blog.deleteOne({ _id: req.body.id })
    .then((data) => {
      console.log(data);
      Blog.find({ owner: user._id })
        .then((data) => {
          // console.log(data);
          res.status(200).json({ data: data });
        })
        .catch((e) => console.log(e.message));
    })
    .catch((err) => console.log(err.message));
};

module.exports = controller;
