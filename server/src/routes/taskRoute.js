const express = require('express')
const { createTask, getTasks, getTask, getTasksByUtente, updateTask, updateSalvata, deleteTask } = require('../controllers/taskController.js')

const taskRoute = express.Router()

taskRoute.post("/createTask", createTask)
taskRoute.get("/getTasks", getTasks)
taskRoute.get("/getTask/:taskId", getTask)
taskRoute.get("/getTasksByUtente/:utenteId", getTasksByUtente)
taskRoute.put("/updateTask/:taskId", updateTask)
taskRoute.put("/updateSalvata/:taskId", updateSalvata)
taskRoute.delete("/deleteTask/:taskId", deleteTask)

module.exports = taskRoute