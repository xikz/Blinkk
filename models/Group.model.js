const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const groupSchema = new Schema({
  groupName: {
    type: String,
  },

  groupImage: { type: String },

  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Group = model("Group", groupSchema);

module.exports = Group;
