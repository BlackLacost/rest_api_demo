const config = require("rc");

module.exports = config("API", {
  PORT: 4000,
  DB_URI: "mongodb://localhost:27017/api",
  TEST_DB_URI: "mongodb://localhost:27017/mockUserDB"
});
