const router = require("express").Router();
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Group = require("../models/Group.model");

router.get("/admin/updateprofile", (req, res, next) => {});

router.put("/admin/updateprofile", (req, res, next) => {});

//*Must to be logged in
router.get("/admin/links", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("links")
    .populate("groups")
    .then((user) => {
      res.render("admin/links", { user: user });
      console.log(user);
    });
});

//*Must to be logged in
router.post("/admin/addlink", isLoggedIn, (req, res, next) => {
  const {
    linkUrl,
    linkTitle,
    thumbnailUrl,
    linkDescription,
    contentFrom,
  } = req.body;
  Link.create({
    linkUrl: linkUrl,
    linkTitle: linkTitle,
    thumbnailUrl: thumbnailUrl,
    linkDescription: linkDescription,
    contentFrom: contentFrom,
    owner: req.session.user._id,
  })
    .then((createdLink) => {
      console.log("created link:", createdLink);
      User.findByIdAndUpdate(
        req.session.user._id,
        {
          $addToSet: { links: createdLink },
        },
        {
          new: true,
        }
      ).then((updatedUser) => {
        console.log(updatedUser);
        res.redirect("/admin/links");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/admin/links", (req, res, next) => {});

router.get("/admin/collections", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("groups")
    .then((user) => {
      res.render("admin/collections", { user: user });
      console.log(user);
    });
});

router.post("/admin/addcollection", isLoggedIn, (req, res, next) => {
  const { collectionName, collectionImage } = req.body;
  Group.create({
    groupName: collectionName,
    groupImage: collectionImage,
    owner: req.session.user._id,
  })
    .then((createdCollection) => {
      console.log("created collection:", createdCollection);
      User.findByIdAndUpdate(
        req.session.user._id,
        {
          $addToSet: { groups: createdCollection },
        },
        {
          new: true,
        }
      ).then((updatedUser) => {
        console.log(updatedUser);
        res.redirect("/admin/collections");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/admin/analytics", (req, res, next) => {});

router.get("/admin/appearence", (req, res, next) => {});

module.exports = router;
