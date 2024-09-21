const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
