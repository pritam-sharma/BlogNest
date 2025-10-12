const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const postRouter = require("./routes/Posts/postRouter");
const commentRouter = require("./routes/Comments/commentRouter");
const sendEmail = require("./utils/sendEmails");
const path = require("path");
//! Create an express app
const app = express();

app.use(cors());
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

//? Setup the Comment Router
app.use("/api/v1/comments", commentRouter);

// Serve the frontend build folder
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

//? Not found route handler
app.use(notFound);

//? Setup global error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
