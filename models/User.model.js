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
      "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png",
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
