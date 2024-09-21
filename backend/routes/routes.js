const express = require("express");
const uploadAnimal = require("../controller/uploadAnimal");
const addCategory = require("../controller/addCategory");
const getAllCategory = require("../controller/getAllCategory");

const router = express.Router();

//uploadDrawing
router.post("/upload-animal", uploadAnimal);
router.post("/add-category", addCategory);
router.get("/all-category", getAllCategory);

module.exports = router;
