const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

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

  thumbnail_url: {
    type: String,
    required: true,
  },

  group: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

const User = model("Link", linkSchema);

module.exports = User;
