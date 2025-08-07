const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");

//! Create an express app
const app = express();

//! load the environment variable
dotenv.config();

//! Establish connection to MongoDB
connectDB();

//! Set up the middleware
app.use(express.json());

//? Setup the Router
app.use("/", usersRouter);

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
