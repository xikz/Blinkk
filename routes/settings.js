const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  res.render("admin/settings");
});

router.get("/privacy", isLoggedIn, (req, res) => {
  res.render("sett/privacy");
});

router.get("/notifications", isLoggedIn, (req, res) => {
  res.render("sett/notifications");
});

router.get("/password", isLoggedIn, (req, res) => {
  res.render("sett/password");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("sett/profile");
});

module.exports = router;
