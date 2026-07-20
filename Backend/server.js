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
const cookieParser = require("cookie-parser");
const path = require("path");
//! Create an express app
const app = express();

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies
  })
);
app.use(cookieParser());

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
