const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {message: alertMessage, status: alertStatus};

      res.render("admin/voucher/view_voucher", {
        voucher,
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
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", {category, nominal});
    } catch (err) {
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {category, nominals, image, name} = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const desh = fs.createWriteStream(target_path);

        src.pipe(desh);
        src.on("end", async () => {
          try {
            const voucher = new Voucher({
              category,
              nominals,
              image,
              name,
              thumbnail: filename,
            });

            await voucher.save();
            req.flash("alertMessage", "Berhasil Tambah Voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (err) {
            console.log(err);
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Voucher({
          category,
          nominals,
          image,
          name,
        });

        await voucher.save();
        req.flash("alertMessage", "Berhasil Tambah Voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const voucher = await Voucher.findOne({_id: id})
        .populate("category")
        .populate("nominals");
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/edit", {category, nominal, voucher});
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  acctionUpdate: async (req, res) => {
    try {
      const {id} = req.params;
      const {category, nominals, name} = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const desh = fs.createWriteStream(target_path);

        src.pipe(desh);
        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({_id: id});

            let curentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            if (fs.existsSync(curentImage)) {
              fs.unlinkSync(curentImage);
            }

            await Voucher.findOneAndUpdate(
              {_id: id},
              {
                category,
                nominals,
                name,
                thumbnail: filename,
              },
            );

            await voucher.save();
            req.flash("alertMessage", "Berhasil Ubah Voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (err) {
            console.log(err);
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          {_id: id},
          {
            category,
            nominals,
            name,
          },
        );
        req.flash("alertMessage", "Berhasil Ubah Voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  acctionDel: async (req, res) => {
    try {
      const {id} = req.params;

      const voucher = await Voucher.findOne({_id: id});

      let curentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

      if (fs.existsSync(curentImage)) {
        fs.unlinkSync(curentImage);
      }

      await Voucher.findOneAndRemove({_id: id});

      req.flash("alertMessage", "Berhasil Hapus Status");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  acctionStatus: async (req, res) => {
    try {
      const {id} = req.params;
      const voucher = await Voucher.findOne({_id: id});
      let status = voucher.status === "Y" ? "N" : "Y";

      await Voucher.findOneAndUpdate({_id: id}, {status: status});
      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
