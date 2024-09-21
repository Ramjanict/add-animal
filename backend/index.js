const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/Database");
const bodyParser = require("body-parser");
const router = require("./routes/routes");
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

//app router
app.use("/api", router);

//connect database then server running
const PORT = 8080 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("successfully connected to MongoDB");
    console.log(`The Server is Successfully run at ${PORT}`);
  });
});
