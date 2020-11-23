const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  res.render("admin/admin");
});

router.get("/settings", isLoggedIn, (req, res, next) => {
  res.render("admin/settings");
});

router.get("/appearance", isLoggedIn, (req, res, next) => {
  res.render("admin/appearance");
});

router.get("/analytics", isLoggedIn, (req, res, next) => {
  res.render("admin/analytics");
});

//*has to be logged in
router.get("/links", isLoggedIn, (req, res, next) => {
  const { linkUrl, linkTitle, linkDescription, contentFrom } = req.body;
  res.render("admin/links");
});

router.post("/links/addlink", (req, res, next) => {});

router.put("/admin/links", (req, res, next) => {});

module.exports = router;
