const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const pool = require('./db')
const path = require("path")
const PORT = process.env.PORT || 4000

//MIDDLEWARE
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"))
} 

//ROUTES

// get all trips
app.get('/trips', async(req, res) => {
    try{
        const getTrips = await pool.query("SELECT * FROM trip")
        res.json(getTrips.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// get specific trip
app.get("/trips/:id", async (req, res) => {
    try{
        const { id } = req.params
        const trip = await pool.query("SELECT * FROM trip WHERE id = $1", [id])
        res.json(trip.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//create trip
app.post('/trips', async(req, res) => {
    try {
        const { location, date, hotel, flights, days, nights, activities, reservations } = req.body
        const newTrip = await pool.query(
            "INSERT INTO trip (location, date, hotel, flights, days, nights, activities, reservations) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
            [location, date, hotel, flights, days, nights, activities, reservations]
        )
        res.json(newTrip.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

// update 
app.put("/trips/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { location, date, hotel, flights, days, nights, activities, reservations } = req.body 
        const updateTrip = await pool.query("UPDATE trip SET location = $1, date = $2, hotel = $3, flights = $4, days = $5, nights = $6, activities = $7, reservations = $8 WHERE id = $9", [location, date, hotel, flights, days, nights, activities, reservations, id])
        res.json("Trip updated")
    } catch (err) {
        console.error(err.message)
    }
})

// delete 
app.delete("/trips/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTrip = await pool.query("DELETE FROM trip WHERE id = $1", [id])
        res.json("Trip deleted")
    } catch (err) {
        console.error(err.message)
    }
})

// catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})


// server
app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

