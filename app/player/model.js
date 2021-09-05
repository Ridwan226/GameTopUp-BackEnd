const mongoose = require("mongoose");

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "tipe email haris diisi"],
    },
    username: {
      type: String,
      require: [true, "tipe username haris diisi"],
    },
    name: {
      type: String,
      require: [true, "tipe name haris diisi"],
    },
    password: {
      type: String,
      require: [true, "tipe Password haris diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      require: [true, "tipe Role haris diisi"],
    },
    phoneNumber: {
      type: String,
      require: [true, "tipe phoneNumber haris diisi"],
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {timestamp: true},
);

module.exports = mongoose.model("Player", playerSchema);
