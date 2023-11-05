const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const PORT = process.env.port || 3000;

const conn = mongoose.connect(process.env.db_host, {
  ignoreUndefined: true,
});

conn
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit;
  });
