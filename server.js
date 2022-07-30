const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT
const pool = require('./db')


//MIDDLEWARE
app.use(cors())
app.use(express.json())


//ROUTES

//create trip
app.post('/new', async(req, res) => {
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

// get all trips
app.get('/', async(req, res) => {
    try{
        const getTrips = await pool.query("SELECT * FROM trip")
        res.json(getTrips.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// get specific trip
app.get("/:id", async (req, res) => {
    try{
        const { id } = req.params
        const trip = await pool.query("SELECT * FROM trip WHERE id = $1", [id])
        res.json(trip.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// update 
app.put("/:id", async (req, res) => {
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
app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTrip = await pool.query("DELETE FROM trip WHERE id = $1", [id])
        res.json("Trip deleted")
    } catch (err) {
        console.error(err.message)
    }
})

// server
app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

