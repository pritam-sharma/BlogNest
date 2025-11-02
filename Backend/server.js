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

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

//? Not found route handler
app.use(notFound);

app.get("/test", (req, res) => {
  const options = {
    method: "POST",
    hostname: "www.screenshotmachine.com",
    path: "/capture.php",
    headers: {
      Cookie: "PHPSESSID=uqpim8geif0n4ccg640kvlh0pu",
    },
    maxRedirects: 20,
  };

  const postData =
    '------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="url"\r\n\r\nhttps://www.hostinger.com/\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="device"\r\n\r\ndesktop\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="cacheLimit"\r\n\r\n0\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--';

  const request = https.request(options, (response) => {
    let chunks = [];
    response.on("data", (chunk) => {
      chunks.push(chunk);
    });
    response.on("end", () => {
      const body = Buffer.concat(chunks);
      res.status(200).send(body.toString());
    });
    response.on("error", (error) => {
      res.status(500).send("Error: " + error.message);
    });
  });

  request.setHeader(
    "content-type",
    "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  );
  request.write(postData);
  request.end();
});

//? Setup global error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
