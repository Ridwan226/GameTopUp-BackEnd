const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema(
  {
    coinQuantity: {
      type: Number,
      default: 0,
    },
    coinName: {
      type: String,
      require: [true, "Nama Coin Harus di Isi"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {timestamp: true},
);

module.exports = mongoose.model("Nominal", nominalSchema);
