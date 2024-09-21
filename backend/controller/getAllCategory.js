const animalModel = require("../model/animalModel");

const getAllCategory = async (req, res) => {
  const allAnimalCategory = await animalModel.find().populate("categoryId");

  try {
    res.status(201).json({
      message: "Get all category",
      error: false,
      success: true,
      data: allAnimalCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getAllCategory;
