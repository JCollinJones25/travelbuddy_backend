const Pool = require('pg').Pool;

const pool = new Pool({
    user: "CollinJones",
    password: "collinjones",
    host: "localhost",
    port: 5432,
    database: "trips"
})

module.exports = pool;