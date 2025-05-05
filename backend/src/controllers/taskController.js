const Task = require('../models/taskModel.js')

const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body)
        const dati = await newTask.save()
        res.status(200).json(dati)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const datiTask = await Utente.find()
        if (!datiTask || datiTask.length === 0) {
            return res.status(404).json({ message: "Dati Task non trovati." })
        }
        res.status(200).json(datiTask)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const taskEsiste = await Utente.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }
        res.status(200).json(taskEsiste)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const taskEsiste = await Task.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }
        const updatedData = await Utente.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const taskEsiste = await Utente.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }
        await Task.findByIdAndDelete(id)
        res.status(200).json({ message: "Task cancellata con successo." })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}

