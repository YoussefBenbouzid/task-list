const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute.js')
const utenteRoute = require('./routes/utenteRoute.js')

const app = express()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const secretKey = process.env.secretKey

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