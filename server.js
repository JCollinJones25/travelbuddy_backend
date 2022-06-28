const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const pool = require('./db')

app.use(cors())

app.get('/new', async(req, res, next) => {
    try{
        res.render("new.ejs")
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})