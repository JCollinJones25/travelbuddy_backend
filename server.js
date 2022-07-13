const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const pool = require('./db')

app.use(cors())
app.use(express.json())


//create 

app.post('/todos/new', async(req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})


// get all

app.get('/todos', async(req, res) => {
    try{
        const getTodos = await pool.query("SELECT * FROM todo")
        res.json(getTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})




app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

