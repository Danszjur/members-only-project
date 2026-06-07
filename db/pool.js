const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "mazlika2",
  database: "members_only",
  password: "0",
  port: 5432,
});
