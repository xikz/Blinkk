const router = require("express").Router();
const Link = require("../models/Link.model");
const Group = require("../models/Group.model");

router.get("/", (req, res) => {
  console.log(req.session);

  res.json(true);
});

router.post("/new-order", (req, res) => {
  console.log(req.body);
  let i = 0;
  req.body.forEach((linkId) => {
    Link.findByIdAndUpdate(
      linkId,
      {
        $set: { order: i },
      },

      {
        new: true,
      }
    )
      .then((resp) => {
        console.log("link updated:", resp);
      })
      .catch((err) => console.log(err));
    i++;
  });

  res.json(true);
});

router.post("/link-to-collection", (req, res) => {
  console.log(req.body);
  Link.findById(req.body.droppableLinkId).then((droppedLink) => {
    Group.findByIdAndUpdate(
      req.body.collectionId,
      {
        $addToSet: { links: droppedLink },
      },
      {
        new: true,
      }
    ).then((res) =>
      Link.findByIdAndUpdate(
        req.body.droppableLinkId,
        {
          status: "Assigned",
        },
        {
          new: true,
        }
      ).then((res) => console.log("updated status", res))
    );
  });
});

module.exports = router;
