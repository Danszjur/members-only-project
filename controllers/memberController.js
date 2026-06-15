const queries = require("../db/queries");

function getJoinClub(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  if (get)
    res.render("join-club", {
      title: "join Club",
      error: null,
    });
}

async function postJoinClub(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  }

  const { passcode } = req.body;

  if (passcode !== process.env.MEMBER_PASSCODE) {
    return res.status(400).render("join-club", {
      title: "Join Club",
      error: "Incorrect passcode",
    });
  }

  try {
    await queries.updateUserMembership(req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error(`Membership update error: `, err);
    res.status(500).send("Something went wrong while updating membership.");
  }
}

module.exports = {
  getJoinClub,
  postJoinClub,
};
