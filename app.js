require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");
const memberRouter = require("./routers/memberRouter");
const messageRouter = require("./routers/messageRouter");
const adminRouter = require("./routers/adminRouter");

const app = express();
const PORT = process.env.PORT || 3000;

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//form data
app.use(express.urlencoded({ extended: false }));

//static files like css or images
app.use(express.static(path.join(__dirname, "public")));

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
  res.locals.currentUser = req.user || null;
  next();
});

//routes
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", memberRouter);
app.use("/", messageRouter);
app.use("/", adminRouter);

//Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
