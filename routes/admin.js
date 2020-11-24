const router = require("express").Router();
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const uploader = require("../config/cloudinary.config.js");

router.get("/", isLoggedIn, (req, res) => {
  res.render("admin/links");
});

//*Must to be logged in
router.get("/links", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("links")
    .populate("groups")
    .then((user) => {
      res.render("admin/links", { user: user });
      console.log(user);
    });
});

//*Must to be logged in
router.post("/addlink", isLoggedIn, (req, res, next) => {
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

router.get("/links/:_id/delete", (req, res, next) => {
  console.log(req.params);
  Link.findByIdAndRemove(req.params).then(() => res.redirect("/admin/links"));
});

router.put("/links", isLoggedIn, (req, res, next) => {});

router.get("/collections", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("groups")
    .then((user) => {
      res.render("admin/collections", { user: user });
      console.log(user);
    });
});

router.post("/addcollection", isLoggedIn, (req, res, next) => {
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

router.get("/analytics", isLoggedIn, (req, res, next) => {
  res.render("admin/analytics");
});

module.exports = router;
