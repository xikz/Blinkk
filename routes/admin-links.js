const router = require("express").Router();
const Link = require("../models/Link.model");

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
    ).then((resp) => {
      console.log("link updated:", resp);
    });
    i++;
  });

  res.json(true);
});

module.exports = router;
