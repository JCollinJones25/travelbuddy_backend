const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(cors())

app.get('/', function(req, res) {
    res.send('<p>express backend hosted on heroku!!</p>')
})

app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})