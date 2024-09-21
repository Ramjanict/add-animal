const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalSchema = new mongoose.Schema(
  {
    imageUrl: String,
    animalName: {
      type: String,
      unique: true,
      required: true,
    },
    categoryId: {
      ref: "category",
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const animalModel = mongoose.model("animal", animalSchema);
module.exports = animalModel;
