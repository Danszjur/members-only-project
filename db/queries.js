const pool = require("./pool");

async function testConnection() {
    const { rows } = await pool.query("SELECT NOW()");
    return rows[0];
}

module.exports = {
    testConnection,
}