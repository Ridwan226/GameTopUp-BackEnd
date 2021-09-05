const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const bank = await Bank.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/bank/view_bank", {
        bank,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (err) {
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name, bankName, noRekening} = req.body;

      req.flash("alertMessage", "Berhasil Tambah Bank");
      req.flash("alertStatus", "success");

      let bank = await Bank({name, bankName, noRekening});
      await bank.save();
      res.redirect("/bank");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const bank = await Bank.findOne({_id: id});
      res.render("admin/bank/edit", {bank});
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  acctionUpdate: async (req, res) => {
    try {
      const {id} = req.params;
      const {name, bankName, noRekening} = req.body;
      await Bank.findOneAndUpdate({_id: id}, {name, bankName, noRekening});
      req.flash("alertMessage", "Berhasil Ubah Nominal");
      req.flash("alertStatus", "success");
      // console.log(id);
      res.redirect("/bank");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  acctionDel: async (req, res) => {
    try {
      const {id} = req.params;
      await Bank.findOneAndRemove({_id: id});
      req.flash("alertMessage", "Berhasil Hapus Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
