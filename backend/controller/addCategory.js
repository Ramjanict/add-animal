const categoryModel = require("../model/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const animal = await categoryModel.findOne({ category });

    if (animal) {
      throw new Error("Already category exits.");
    }
    if (!category) {
      throw new Error("Please Provide a category");
    }

    const animalSave = new categoryModel(req.body);
    const saveAnimal = await animalSave.save();
    res.status(201).json({
      data: saveAnimal,
      success: true,
      error: false,
      message: "Category added  Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = addCategory;
