const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true, minlength: 8 },

  location: { type: String },
  bio: { type: String },
  profilePic: {
    type: String,
    default:
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
    //   appearance: {
    // bgColor: String
    //   }
  ],

  interests: [{ type: String, enum: ["Music", "Food", "Sports"] }],

  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: "",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
