const drawingModel = require("../model/productModel");

const gategoryWiseDrawing = async (req, res) => {
  try {
    const { category } = req.body;

    const categoryData = await drawingModel.find({ category });
    res.status(201).json({
      message: "category",
      error: false,
      success: true,
      data: categoryData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = gategoryWiseDrawing;
