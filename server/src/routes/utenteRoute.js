const express = require('express')
const { register, login, logout, getUtente, updateUtente, deleteUtente, getUtenti } = require('../controllers/utenteController.js')
const verifyToken = require('../middlewares/authMiddleware.js')

const utenteRoute = express.Router()

utenteRoute.post("/register", register)
utenteRoute.post("/login", login)
utenteRoute.post("/logout", logout)
utenteRoute.get("/getUtente/:utenteId", verifyToken, getUtente)
utenteRoute.put("/updateUtente/:utenteId", verifyToken, updateUtente)
utenteRoute.delete("/deleteUtente/:utenteId", verifyToken, deleteUtente)
utenteRoute.get("/getUtenti", getUtenti)

module.exports = utenteRoute