const mongoose = require("mongoose");

let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama Kategory Tidak bisa kosong"],
    },
  },
  {timestamp: true},
);

module.exports = mongoose.model("Category", categorySchema);
