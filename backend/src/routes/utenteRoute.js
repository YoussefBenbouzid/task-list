const express = require('express')
import { create, getAllUtenti, getUtenteById, update } from '../models/utenteModel.js'

const route = express.Router()

route.post("/utente", create)
route.get("/utenti", getAllUtenti)
route.get("utente/:id", getUtenteById)
route.put("/update/user/:id", update)
route.delete("/delete/utente/:id", delete)

export default route