const express = require('express')
import { create } from '../models/utenteModel.js'

const route = express.Router()

route.post("/utente", create)
route.get("/utenti", getAllUtenti)
route.get("utente/:id", getUtenteById)

export default route