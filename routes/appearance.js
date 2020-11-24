const router = require("express").Router();
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const uploader = require("../config/cloudinary.config.js");

router.get("/", isLoggedIn, (req, res, next) => {
  let user = req.session.user._id;

  User.findById(user).then((foundUser) => {
    console.log(foundUser);
    res.render("admin/appearance", { foundUser });
  });
});

router.post("/", isLoggedIn, uploader.single("imageUrl"), (req, res, next) => {
  // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
  console.log("file is: ", req.file);

  if (!req.file) {
    console.log("there was an error uploading the file");
    res.render("admin/appearance", {
      errorMessage: "There was an error uploading the file",
    });
  }
  // You will get the image url in 'req.file.path'
  // Your code to store your url in your database should be here

  User.findByIdAndUpdate(
    req.session.user._id,
    { profilePic: req.file.path },
    { new: true }
  ).then((newAndUpdatedUser) => {
    req.session.user = newAndUpdatedUser;
    console.log("BLALBA", newAndUpdatedUser);
    // after we update user with the new data, here we are just making sure that we have the most up to date info in the session. This user now has a new password therefore we should have the new password also on the user session
    res.render("admin/appearance", { newAndUpdatedUser });
  });
});

module.exports = router;
