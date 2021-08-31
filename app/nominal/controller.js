const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const nominal = await Nominal.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
      });
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      // res.redirect("category");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (err) {
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {coinName, coinQuantity, price} = req.body;

      req.flash("alertMessage", "Berhasil Tambah Nominal");
      req.flash("alertStatus", "success");

      let nominal = await Nominal({coinName, coinQuantity, price});
      await nominal.save();
      res.redirect("/nominal");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const nominal = await Nominal.findOne({_id: id});
      res.render("admin/nominal/edit", {nominal});
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  acctionUpdate: async (req, res) => {
    try {
      const {id} = req.params;
      const {coinName, coinQuantity, price} = req.body;
      await Nominal.findOneAndUpdate(
        {_id: id},
        {coinName, coinQuantity, price},
      );
      req.flash("alertMessage", "Berhasil Ubah Nominal");
      req.flash("alertStatus", "success");
      // console.log(id);
      res.redirect("/nominal");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  acctionDel: async (req, res) => {
    try {
      const {id} = req.params;
      await Nominal.findOneAndRemove({_id: id});
      req.flash("alertMessage", "Berhasil Hapus Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
