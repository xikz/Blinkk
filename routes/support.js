const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("support");
});

router.get("/faqs", (req, res, next) => {
  res.render("support/faqs");
});

router.get("/howto", (req, res, next) => {
  res.render("support/howto");
});

module.exports = router;
