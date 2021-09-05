const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "tipe email haris diisi"],
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
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  {timestamp: true},
);

module.exports = mongoose.model("User", userSchema);
