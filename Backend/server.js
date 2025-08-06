const express = require("express");
const dotenv = require("dotenv");
const app = express();

//! load the environment variable
dotenv.config();

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
