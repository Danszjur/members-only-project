const queries = require("../db/queries");

async function getHomePage(req, res) {
  try {
    const messages = await queries.getAllMessages();

    console.log("Messages on home page:", messages);

    res.render("index", {
      title: "Members Only",
      currentUser: req.user || null,
      messages,
    });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).send("Something went wrong while loading messages.");
  }
}

module.exports = {
  getHomePage,
};
