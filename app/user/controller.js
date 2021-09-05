const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/user/view_signin", {alert});
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      // res.redirect("category");
      console.log(err);
    }
  },

  acctionSignIn: async (req, res) => {
    try {
      const {email, password} = req.body;

      const check = await User.findOne({email: email});

      if (check) {
        if (check.status === "Y") {
          const cekPassword = await bcrypt.compare(password, check.password);

          if (cekPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name,
            };

            req.flash("alertMessage", `Status Email Tidak Aktif`);
            req.flash("alertStatus", "success");
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `Kata Sandi Salah`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", `Status Email Tidak Aktif`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Email Yang andan Input Salah`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/user/view_signin", {alert});
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
      console.log(err);
    }
  },

  acctionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
