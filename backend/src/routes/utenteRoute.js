const express = require('express')
const { createUtente, getUtenti, getUtente, updateUtente, deleteUtente } = require('../controllers/utenteController.js')

const utenteRoute = express.Router()

utenteRoute.post("/createUtente", createUtente) // Da sostituire con routes/auth/register
utenteRoute.get("/getUtenti", getUtenti)
utenteRoute.get("/getUtente/:utenteId", getUtente)
utenteRoute.put("/updateUtente/:utenteId", updateUtente)
utenteRoute.delete("/deleteUtente/:utenteId", deleteUtente)

module.exports = utenteRoute