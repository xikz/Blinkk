const mongoose = require("mongoose");
const { Schema, model, Mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const linkSchema = new Schema({
  linkTitle: {
    type: String,
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
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  order: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "Unassigned",
    enum: ["Unassigned", "Assigned"],
  },
});

const Link = model("Link", linkSchema);

module.exports = Link;
