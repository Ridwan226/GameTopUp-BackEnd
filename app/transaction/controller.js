const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.find().populate("player");
      console.log(transaction);

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
      });
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      // res.redirect("category");
      console.log(err);
    }
  },

  acctionStatus: async (req, res) => {
    try {
      const {id} = req.params;
      const {status} = req.query;

      await Transaction.findOneAndUpdate({_id: id}, {status});

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
