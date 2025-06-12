const express = require('express')
const { createTask, getTasks, getTask, getTasksByUtente, updateTask, deleteTask, deleteTasksByUtente } = require('../controllers/taskController.js')
const verifyToken = require('../middlewares/authMiddleware.js')

const taskRoute = express.Router()

taskRoute.post("/createTask", verifyToken, createTask)
taskRoute.get("/getTasks", getTasks)
taskRoute.get("/getTask/:taskId", getTask)
taskRoute.get("/getTasksByUtente/:utenteId", verifyToken, getTasksByUtente)
taskRoute.put("/updateTask/:taskId", verifyToken, updateTask)
taskRoute.delete("/deleteTask/:taskId", verifyToken, deleteTask)
taskRoute.delete("/deleteTasksByUtente/:utenteId", verifyToken, deleteTasksByUtente)

module.exports = taskRoute
