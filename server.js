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

// update 
app.put("/trips/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { location, hotel, flights, days, nights, activities, reservations } = req.body 
        const updateTrip = await pool.query("UPDATE trip SET location = $1, hotel = $2, flights = $3, days = $4, nights = $5, activities = $6, reservations = $7 WHERE id = $8", [location, hotel, flights, days, nights, activities, reservations, id])
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

// server
app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

