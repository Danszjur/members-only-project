const queries = require("../db/queries");

function getNewMessage(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  res.render("new-message", {
    title: "New message",
    errors: [],
    formData: {},
  });
}

async function postNewMessage(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).render("new-message", {
      title: "New message",
      errors: [{ msg: "Title and text are required." }],
      formData: req.body,
    });
  }

  try {
    await queries.createMessage(title, text, req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error("Create message error: ", err);
    res.status(500).send("Something went wrong while creating the message.");
  }
}

async function deleteMessage(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  if (!req.user.is_admin) {
    return res.status(403).send("You are not allowed to delete messages.");
  }

  const { id } = req.params;

  try {
    await queries.deleteMessage(id);
    res.redirect("/");
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).send("Something went wrong while deleting the message.");
  }
}

module.exports = {
  getNewMessage,
  postNewMessage,
  deleteMessage,
};
