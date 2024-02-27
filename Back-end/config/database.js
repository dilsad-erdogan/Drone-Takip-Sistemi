const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ProjeDB",
    password: "sevde200142",
    port: 5432,
});

module.exports = pool;

//Data base bağlantısı