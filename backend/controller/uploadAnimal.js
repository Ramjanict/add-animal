const animalModel = require("../model/animalModel");

const uploadAnimal = async (req, res) => {
  try {
    const { animalName } = req.body;
    const animal = await animalModel.findOne({ animalName });

    if (animal) {
      throw new Error("Animal name already  exits.");
    }
    if (!animalName) {
      throw new Error("Please Provide a animal name");
    }

    const animalSave = new animalModel(req.body);
    const saveAnimal = await animalSave.save();
    res.status(201).json({
      data: saveAnimal,
      success: true,
      error: false,
      message: "Aniamal added  Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = uploadAnimal;
