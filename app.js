require("dotenv").config();

const express = require("express");
const path = require("path");

const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");
/*
const messageRouter = require("./routers/messageRouter");
const memberRouter = require("./routers/memberRouter")
*/
const app = express();
const PORT = process.env.PORT || 3000;


//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//form data
app.use(express.urlencoded({ extended: false }));

//static files like css or images
app.use(express.static(path.join(__dirname, "public")))

//routes
app.use("/", indexRouter);
app.use("/", authRouter);
/*
app.use("/", messageRouter);
app.use("/", memberRouter);
*/

//Server start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});