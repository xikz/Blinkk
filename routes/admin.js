const router = require("express").Router();
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/admin/updateprofile", (req, res, next) => {});

router.put("/admin/updateprofile", (req, res, next) => {});

//*has to be logged in
router.get("/admin/links", isLoggedIn, (req, res, next) => {
  const { linkUrl, linkTitle, linkDescription, contentFrom } = req.body;
  res.render("admin/links");
});

router.post("/admin/addlink", (req, res, next) => {});

router.put("/admin/links", (req, res, next) => {});

router.get("/admin/analytics", (req, res, next) => {});

router.get("/admin/appearence", (req, res, next) => {});

module.exports = router;
