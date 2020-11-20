const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//NOT PRIORITY
router.get("/info", (req, res, next) => {});

//NOT PRIORITY
router.get("/support", (req, res, next) => {});

module.exports = router;
