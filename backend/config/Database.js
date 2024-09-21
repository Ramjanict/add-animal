const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOBD_URI);
  } catch (error) {
    console.log("something is wrong", error);
  }
};

module.exports = connectDB;
