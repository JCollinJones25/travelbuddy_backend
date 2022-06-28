const Pool = require('pg').Pool;

const pool = new Pool({
    user: "CollinJones",
    password: "collinjones",
    host: "https://pernappbackend.herokuapp.com/",
    database: "trips"
})

module.exports = pool;