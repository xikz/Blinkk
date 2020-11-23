const router = require("express").Router();

router.get("/admin/updateprofile", (req, res, next) => {});

router.put("/admin/updateprofile", (req, res, next) => {});

router.get("/admin/links", (req, res, next) => {
  res.render("admin/links");
});

router.post("/admin/links", (req, res, next) => {});

router.put("/admin/links", (req, res, next) => {});

router.get("/admin/analytics", (req, res, next) => {});

router.get("/admin/appearence", (req, res, next) => {});

module.exports = router;
