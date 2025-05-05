const express = require('express')
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../models/taskModel.js')

const route = express.Router()

route.post("/utente", createTask)
route.get("/utenti", getAllTasks)
route.get("/utente/:id", getTaskById)
route.put("/updateUtente/utente/:id", updateTask)
route.delete("/deleteUtente/utente/:id", deleteTask)

module.exports = route