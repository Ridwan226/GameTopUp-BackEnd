const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {type: String, require: [true, "Name Game Harus Di Isi"]},
      category: {type: String, require: [true, "category Game Harus Di Isi"]},
      thumbnail: {type: String},
      coinName: {type: String, require: [true, "coinName Game Harus Di Isi"]},
      coinQuantity: {
        type: String,
        require: [true, "Jumlah coinQuantity Game Harus Di Isi"],
      },
      price: {type: Number},
    },

    historyPayment: {
      name: {type: String, require: [true, "name Payment Harus Di Isi"]},
      type: {type: String, require: [true, "type Payment Harus Di Isi"]},
      nameBank: {
        type: String,
        require: [true, "nameBank Payment Harus Di Isi"],
      },
      noRekening: {
        type: String,
        require: [true, "noRekening Payment Harus Di Isi"],
      },
    },
    name: {type: String, require: [true, "name Harus di isi"], maxLength: 225},
    accountUser: {type: String, require: [true, "Account Harus di isi"]},
    tax: {type: Number, require: [true, "tax Harus di isi"], default: 0},
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {type: mongoose.Schema.Types.ObjectId, ref: "Players"},
    historyUser: {
      name: {type: String, require: [true, "name User Harus Di Isi"]},
      phoneNumber: {
        type: String,
        require: [true, "phoneNumber User Harus Di Isi"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
  },
  {timestamp: true},
);

module.exports = mongoose.model("Transaction", transactionSchema);
