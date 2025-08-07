const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBURL = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.log("Connection to MongoDB failed : ", error.message);
  }
};

module.exports = connectDB;
