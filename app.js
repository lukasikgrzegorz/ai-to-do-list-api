const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users.js");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

require("./config/passportConfig.js");

app.use("/api/v1/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
