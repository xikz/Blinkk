const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("support");
});

router.get("/about", (req, res, next) => {
  res.render("info/about");
});

router.get("/contact", (req, res, next) => {
  res.render("info/contact");
});

module.exports = router;
