const queries = require("../db/queries");

function getAdminPage(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  if (req.user.is_admin) {
    return res.redirect("/");
  }

  res.render("admin", {
    title: "Become Admin",
    error: null,
  });
}

async function postAdminPage(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  if (req.user.is_admin) {
    return res.redirect("/");
  }

  const { adminConfirm } = req.body;

  if (adminConfirm !== "on") {
    return res.status(400).render("admin", {
      title: "Become Admin",
      error: "You must check the box to become admin.",
    });
  }

  try {
    await queries.updateUserAdmin(req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).send("Something went wrong while updating admin status.");
  }
}

module.exports = {
  getAdminPage,
  postAdminPage,
};
