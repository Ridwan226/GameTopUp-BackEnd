const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const category = await Category.find();

      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/category/view_category", {
        category,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("category");
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (err) {
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name} = req.body;

      req.flash("alertMessage", "Berhasil Tambah Category");
      req.flash("alertStatus", "success");

      let category = await Category({name: name});
      await category.save();
      res.redirect("/category");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.findOne({_id: id});
      res.render("admin/category/edit", {category});
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  acctionUpdate: async (req, res) => {
    try {
      const {id} = req.params;
      const {name} = req.body;
      await Category.findOneAndUpdate({_id: id}, {name});
      req.flash("alertMessage", "Berhasil Ubah Category");
      req.flash("alertStatus", "success");
      // console.log(id);
      res.redirect("/category");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  acctionDel: async (req, res) => {
    try {
      const {id} = req.params;
      await Category.findOneAndRemove({_id: id});
      req.flash("alertMessage", "Berhasil Hapus Category");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
