const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama Kategory Tidak bisa kosong"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
