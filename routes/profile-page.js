const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Link = require("../models/Link.model");
const Group = require("../models/Group.model");

router.get("/", (req, res, next) => {
  res.render("userProfile/userProfile");
});

router.get("/:username", (req, res) => {
  const username = req.params;

  User.findOne(username)
    .populate("links")
    .populate("groups")
    .then((user) => {
      user.links.sort((a, b) => a.order - b.order);
      const links = user.links.filter((link) => link.status === "Unassigned");
      const groups = user.groups;
      userLinks = { links };
      userGroups = { groups };
      // console.log(userGroups);
      res.render("userProfile/userProfile", { userLinks, userGroups, user });
    });
});

router.get("/:username/:groupId", (req, res) => {
  const username = req.params;

  // console.log("GROUPPSSSS");

  // User.findOne({ username: username.username })
  //   .populate("groups")
  //   .then((userFound) => {
  //     console.log("LDLDLDLD", userFound);
  //     const profilePic = userFound.profilePic;
  //     const bio = userFound.bio;
  //     const groups = userFound.groups;
  //     Group.findById(req.params.groupId)
  //       .populate("links")
  //       .then((group) => {
  //         links = group.links;
  //         object = { profilePic, groups, bio, links: links };
  //         console.log("THIS IS:", object);
  //         // console.log(object.links[0]);
  //         res.render("userProfile/userCollection", object);
  //       })
  //       .catch((err) => console.log(err));
  //   });

  // User.findById(req.params.groupId)
  //   .populate("links")
  //   .populate("owner")
  //   .then((groups) => {
  //     // user.links.sort((a, b) => a.order - b.order);
  //     // const links = user.links.filter((link) => link.status === "Unassigned");
  //     // const groups = user.groups;
  //     // userLinks = { links };
  //     // userGroups = { groups };
  //     console.log("defefef", groups);
  //     res.render("userProfile/userCollection", { groups: groups });
  //   });
});

module.exports = router;

// router.get("/:username/:groupId", (req, res) => {
//   const username = req.params;

//   console.log("GROUPPSSSS");

//   Group.findById(req.params.groupId)
//     .populate("links")
//     .then((groups) => {
//       // user.links.sort((a, b) => a.order - b.order);
//       // const links = user.links.filter((link) => link.status === "Unassigned");
//       // const groups = user.groups;
//       // userLinks = { links };
//       // userGroups = { groups };
//       console.log("defefef", groups);
//       res.render("userProfile/userCollection", { groups });
//     });
