const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Link = require("../models/Link.model");

router.get("/", (req, res, next) => {
  res.render("userProfile/userProfile");
});

router.get("/:username", (req, res) => {
  const username = req.params;
  console.log("Searching for the user", username);

  User.findOne(username).then((foundUser) => {
    res.render("userProfile/userProfile", { foundUser });
  });

  // Link.find({"_id": {$in: []}).then((foundUser) => {
  //   console.log(foundUser);
  //   res.render("userProfile/userProfile", { foundUser });
  // });
});

module.exports = router;
