const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
import route from './routes/utenteRoute.js'


const app = express()

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL

mongoose
.connect(DATABASE_URL)
.then(() => {
    console.log("Database connesso con successo.")
    app.listen(PORT, () => {
        console.log("Server attivo.")
    })

})
.catch((error) => console.log(error))

app.use("/api", route)