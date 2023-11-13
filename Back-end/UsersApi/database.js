const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ProjeDB",
    password: "716350",
    port: 5432,
});

module.exports = pool;