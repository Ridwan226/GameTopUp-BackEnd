const Player = require("../player/model");
const fs = require("fs");
const path = require("path");
const config = require("../../config");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;

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
            const player = new Player({...payload, avatar: filename});

            await player.save();
            delete player._doc.password;
            res.status(201).json({data: player});
          } catch (err) {
            if (err && err.name === "ValidationError") {
              return res
                .status(422)
                .json({message: err.message, fields: err.errors, error: 1});
            }

            next(err);
          }
        });
      } else {
        let player = new Player(payload);

        await player.save();

        res.status(201).json({data: player});
      }

      // res.status(201).json({
      //   message: payload,
      // });
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res
          .status(422)
          .json({message: err.message, fields: err.errors, error: 1});
      }

      next(err);
    }
  },

  signIn: (req, res, next) => {
    const {email, password} = req.body;

    Player.findOne({email: email})
      .then((player) => {
        if (player) {
          const cekPassword = bcript.compareSync(password, player.password);
          if (cekPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  username: player.username,
                  email: player.email,
                  name: player.name,
                  phoneNumber: player.phoneNumber,
                  avatar: player.avatar,
                },
              },
              config.jwtKey,
            );

            res.status(200).json({data: {token}});
          } else {
            res.status(403).json({message: "Kata Sanda Salah"});
          }
        } else {
          res
            .status(403)
            .json({message: " Email Yang Anda Masukan Belum Terdaftar"});
        }
      })
      .catch((err) => {
        res.status(500).json({message: err.message || "Internal Server Error"});
        next();
      });
  },
};
