const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute.js')
const utenteRoute = require('./routes/utenteRoute.js')

const app = express()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

mongoose
.connect(MONGODB_URI)
.then(() => {
    console.log("Database connesso con successo.")
    app.listen(PORT, () => {
        console.log("Server attivo.")
    })
})
.catch((error) => console.log(error))

app.use(cors())
app.use(express.json())
app.use("/api/task", taskRoute)
app.use("/api/utenti", utenteRoute)