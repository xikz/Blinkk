const router = require("express").Router();
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const uploader = require("../config/cloudinary.config.js");
const { response } = require("express");

router.get("/", isLoggedIn, (req, res) => {
  let username = req.session.user.username;
  console.log("Username", username);

  res.render("admin/links", { username });
});

//*Must to be logged in
router.get("/links", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("links")
    .populate("groups")
    .then((user) => {
      user.links.sort((a, b) => a.order - b.order);
      const links = user.links.filter((link) => link.status === "Unassigned");
      const groups = user.groups;
      user = { user, links, groups };
      console.log("VISITING LINKS PAGE", user);
      res.render("admin/links", { user: user });
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

//IN COLLECTION PAGE //IN COLLECTION PAGE //IN COLLECTION PAGE
router.get("/collection/:groupId/:linkId/delete", (req, res, next) => {
  console.log("params:", req.params);

  Link.findByIdAndRemove(req.params.linkId).then(() =>
    res.redirect(`/admin/open-collection/${req.params.groupId}`)
  );
});

//removing a link from a collection
router.get(
  "/collection/:groupId/:linkId/remove-link-from-collection",
  (req, res) => {
    console.log("params:", req.params);
    Group.update(
      { _id: req.params.groupId },
      { $pull: { links: req.params.linkId } },
      { new: true }
    ).then((updatedGroup) => {
      Link.findByIdAndUpdate(req.params.linkId, {
        $set: { status: "Unassigned" },
      }).then((updatedLink) => {
        console.log(updatedLink);
      });
      res.redirect(`/admin/open-collection/${req.params.groupId}`);
    });
  }
);

router.get("/links/:_id/delete", (req, res, next) => {
  console.log(req.params);
  Link.findByIdAndRemove(req.params).then(() => res.redirect("/admin/links"));
});

router.get("/add-collection", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("groups")
    .then((user) => {
      res.render("admin/add-collection", { user: user });
      console.log(user);
    });
});

router.get("/open-collection/:_id", (req, res) => {
  console.log(req.params);

  Group.findById(req.params)
    .populate("links")
    .then((resp) => res.render("admin/open-collection", { group: resp }))
    .catch((err) => console.log(err));
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
        res.redirect("/admin/add-collection");
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
