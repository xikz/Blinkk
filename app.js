// ℹ️ To get access to environment
require("dotenv").config();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// ℹ️ Connect to the database
require("./db");

const express = require("express");
const hbs = require("hbs");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();

// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const projectName = "linkmee";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;
// default value for title local

// 👇 Start handling routes here
const index = require("./routes/index");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const supportRoutes = require("./routes/support");
const infoRoutes = require("./routes/info");
const settingsRoutes = require("./routes/settings");
const appearanceRoutes = require("./routes/appearance");
const profileRoutes = require("./routes/profile-page");
const apiAdminRoutes = require("./routes/admin-links");

app.use("/", index);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/support", supportRoutes);
app.use("/info", infoRoutes);
app.use("/settings", settingsRoutes);
app.use("/appearance", appearanceRoutes);
app.use("/api", apiAdminRoutes);
app.use("/", profileRoutes);

// ❗ To handle errors. Routes that dont exist or errors that you handle in specfic routes
require("./error-handling")(app);

module.exports = app;
