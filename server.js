const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const pool = require('./db')
const bodyParser = require("body-parser")


//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    next();
  });

if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"))
} 

//ROUTES

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

// server
app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

