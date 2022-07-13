const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const pool = require('./db')

app.use(cors())
app.use(express.json())


//create 

app.post('/trips/new', async(req, res) => {
    try {
        const { location, hotel, flights, days, nights, activities, reservations } = req.body
        const newTrip = await pool.query(
            "INSERT INTO trip (location, hotel, flights, days, nights, activities, reservations) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            [location, hotel, flights, days, nights, activities, reservations]
        )
        res.json(newTrip.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})


// get all

app.get('/trips', async(req, res) => {
    try{
        const getTrips = await pool.query("SELECT * FROM trip")
        res.json(getTrips.rows)
    } catch (err) {
        console.error(err.message);
    }
})




app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

