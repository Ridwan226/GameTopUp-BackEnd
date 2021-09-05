const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name Coin Harus di Isi"],
    },
    bankName: {
      type: String,
      require: [true, "nameBank Coin Harus di Isi"],
    },
    noRekening: {
      type: String,
      require: [true, "noRekening Coin Harus di Isi"],
    },
  },
  {timestamp: true},
);

module.exports = mongoose.model("Bank", bankSchema);
