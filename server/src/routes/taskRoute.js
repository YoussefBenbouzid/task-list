const express = require('express')
const { createTask, getTasks, getTask, getTasksByUtente, updateTask, updateSalvata, deleteTask } = require('../controllers/taskController.js')
const verifyToken = require('../middlewares/authMiddleware.js')

const taskRoute = express.Router()

taskRoute.post("/createTask", verifyToken, createTask)
taskRoute.get("/getTasks", getTasks)
taskRoute.get("/getTask/:taskId", getTask)
taskRoute.get("/getTasksByUtente/:utenteId", verifyToken, getTasksByUtente)
taskRoute.put("/updateTask/:taskId", verifyToken, updateTask)
taskRoute.put("/updateSalvata/:taskId", verifyToken, updateSalvata)
taskRoute.delete("/deleteTask/:taskId", verifyToken, deleteTask)

module.exports = taskRoute
