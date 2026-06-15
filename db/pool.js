const { Pool } = require("pg");

const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,

  database: "members_only",
  host: "localhost",
  user: "mazlika2",
  port: 5432,
  password: "0",
});

module.exports = pool;
