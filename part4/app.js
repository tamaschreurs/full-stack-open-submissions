const express = require("express");
const app = express();
require("express-async-errors");

const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./controllers/users");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.errorHandler);

module.exports = app;
