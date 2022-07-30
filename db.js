const Pool = require('pg').Pool;
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PH_PORT}/${process.env.PG_DATABASE}`

// {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
//     ssl: true
// }

const proConfig = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
})


module.exports = pool;