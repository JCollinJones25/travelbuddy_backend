const Pool = require('pg').Pool;

const pool = new Pool({
    user: "CollinJones",
    password: "collinjones",
    host: "localhost",
    port: 4000,
    database: "trips"
})

module.exports = pool;