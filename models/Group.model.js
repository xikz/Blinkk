const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const groupSchema = new Schema({
  groupName: {
    type: String,
    unique: true,
    required: true,
  },

  groupImage: { type: String },
});

const Group = model("Group", groupSchema);

module.exports = User;
