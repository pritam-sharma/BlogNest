const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const postRouter = require("./routes/Posts/postRouter");

//! Create an express app
const app = express();

//! load the environment variable
dotenv.config();
const DBURL = process.env.DATABASE_URL;

//! Establish connection to MongoDB
connectDB(DBURL);

//! Set up the middleware
app.use(express.json());

//? Setup the User Router
app.use("/api/v1/users", usersRouter);

//? Setup the Category Router
app.use("/api/v1/categories", categoriesRouter);

//? Setup the Post Router
app.use("/api/v1/posts", postRouter);

//? Not found route handler
app.use(notFound);

//? Setup global error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
