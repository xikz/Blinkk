const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  res.render("sett/settings");
});

router.get("/privacy", isLoggedIn, (req, res) => {
  res.render("sett/privacy");
});

router.get("/notifications", isLoggedIn, (req, res) => {
  res.render("sett/notifications");
});

router.get("/password", isLoggedIn, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  res.render("sett/password", { user: req.session.user });
});

// * NEEDS AUTHENTICATED USER
router.post("/password", isLoggedIn, (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    res.render("sett/password", {
      message: "Please confirm the new password.",
    });
  }

  if (!oldPassword || !newPassword || !confirmPassword) {
    res.render("sett/password", {
      message: "Please fill in all fields.",
    });
  }

  if (newPassword.length < 8 || confirmPassword.length < 8) {
    res.render("sett/password", {
      message: "Your password need to have at least 8 characters.",
    });
  }

  // compareSync does the same as compare, but does it synchronously.
  const isSamePassword = bcrypt.compareSync(
    oldPassword,
    req.session.user.password
  );

  if (!isSamePassword) {
    res.render("sett/password", {
      message: "Please choose a different password.",
    });
  }

  const hashingAlgorithm = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, hashingAlgorithm);

  User.findByIdAndUpdate(
    req.session.user._id,
    { password: hashedPassword },
    { new: true }
  ).then((newAndUpdatedUser) => {
    req.session.user = newAndUpdatedUser;
    // after we update user with the new data, here we are just making sure that we have the most up to date info in the session. This user now has a new password therefore we should have the new password also on the user session
    res.render("sett/password", {
      message: "All good, successful, move away",
    });
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("sett/profile");
});

module.exports = router;
