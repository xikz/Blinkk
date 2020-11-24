const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const mongoose = require("mongoose");
// const Link = require("../models/Link.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

module.exports = router;
