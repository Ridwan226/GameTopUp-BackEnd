module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        name: req.session.name,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
