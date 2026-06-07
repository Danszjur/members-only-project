const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

require("./config/passport");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
/*
const memberRouter = require("./routes/memberRouter");
const messageRouter = require("./routes/messageRouter");
*/
const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//-----------------------------------------------------------------

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----------------------------------------------------------------

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//-----------------------------------------------------------------

app.use("/", indexRouter);
//app.use("/", authRouter);
//app.use("/", memberRouter);
//app.use("/messages", messageRouter);

app.use((req, res) => {
  res.status(404).render("error-page");
});

//-----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
