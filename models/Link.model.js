const mongoose = require("mongoose");
const { Schema, model, Mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const linkSchema = new Schema({
  linkTitle: {
    type: String,
    unique: true,
    required: true,
  },
  linkDescription: {
    type: String,
  },

  contentFrom: {
    type: String,
  },

  linkUrl: { type: String, required: true },

  thumbnailUrl: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Link = model("Link", linkSchema);

module.exports = Link;
