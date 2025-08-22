const mongoose = require("mongoose");

const connectDB = async (DBURL) => {
  try {
    await mongoose.connect(DBURL);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.log("Connection to MongoDB failed : ", error.message);
  }
};

module.exports = connectDB;
