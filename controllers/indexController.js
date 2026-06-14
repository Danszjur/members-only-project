

async function getHomePage(req, res) {
    res.render("index", { title: "Members Only" });
};

module.exports = {
    getHomePage,
};