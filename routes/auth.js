const router = require("express").Router();

// ? Package to will handle encryption of password
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Requiring the User model in order to interact with the database
const User = require("../models/User.model");
const Group = require("../models/Group.model");

// Requiring necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { create } = require("hbs");

router.get("/signup", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", shouldNotBeLoggedIn, (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please fill in all fields" });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters",
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  */

  // Search the database for a user with the username submitted in the form

  User.findOne({ username })
    .then((found) => {
      if (found) {
        return res.status(400).render("auth/signup", {
          errorMessage: "This username is already in use.",
        });
      }
      return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          return User.create({
            username,
            email,
            password: hashedPassword,
          });
        })
        .then((user) => {
          req.session.user = user;
          console.log("user:", user);
          res.redirect("/admin/links");
        });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .render("auth/signup", { errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).render("auth/signup", {
          errorMessage: "This email address is already in use.",
        });
      }
    });
});

router.get("/login", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", shouldNotBeLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).render("auth/login", {
      errorMessage: "You need to provide your username and your password.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Incorrect password.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "This user does not exist." });
      }
      req.session.user = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isSamePassword) => {
      if (!isSamePassword) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Incorrect password" });
      }
      // req.session.user = user._id ! better and safer but in this case we saving the entire user object
      return res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
