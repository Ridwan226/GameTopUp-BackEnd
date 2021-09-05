const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const payment = await Payment.find().populate("banks");

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/payment/view_payment", {
        payment,
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
      const bank = await Bank.find();
      res.render("admin/payment/create", {bank});
    } catch (err) {
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {banks, type} = req.body;

      req.flash("alertMessage", "Berhasil Tambah payment");
      req.flash("alertStatus", "success");

      let payment = await Payment({banks, type});
      await payment.save();
      res.redirect("/payment");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const payment = await Payment.findOne({_id: id}).populate("banks");
      const bank = await Bank.find();
      res.render("admin/payment/edit", {payment, bank});
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  acctionUpdate: async (req, res) => {
    try {
      const {id} = req.params;
      const {banks, type} = req.body;
      await Payment.findOneAndUpdate({_id: id}, {banks, type});
      req.flash("alertMessage", "Berhasil Ubah Payment");
      req.flash("alertStatus", "success");
      // console.log(id);
      res.redirect("/payment");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  acctionDel: async (req, res) => {
    try {
      const {id} = req.params;
      await Payment.findOneAndRemove({_id: id});
      req.flash("alertMessage", "Berhasil Hapus Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
