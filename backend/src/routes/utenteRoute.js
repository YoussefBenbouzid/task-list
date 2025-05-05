const express = require('express')
const { createUtente, getAllUtenti, getUtenteById, updateUtente, deleteUtente } = require('../models/utenteModel.js')

const route = express.Router()

route.post("/utente", createUtente)
route.get("/utenti", getAllUtenti)
route.get("/utente/:id", getUtenteById)
route.put("/updateUtente/utente/:id", updateUtente)
route.delete("/deleteUtente/utente/:id", deleteUtente)

module.exports = route