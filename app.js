const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const blogPostsRouter = require("./api/routes/blogPosts.js");
// const usersRouter = require("./api/routes/users.js");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

require("./config/passportConfig.js");

// app.use("/blogposts", blogPostsRouter);
// app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
