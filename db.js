const Pool = require('pg').Pool;

const pool = new Pool({
    user: "CollinJones",
    password: "collinjones",
    host: "localhost",
    port: 5432,
    database: "trips"
})

// const connectStr = process.env.DATABASE_URL;
// const pool = new Pool({
//     connectionString: connectStr,
//     ssl: true
// });

module.exports = pool;