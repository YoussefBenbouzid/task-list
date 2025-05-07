const Task = require('../models/taskModel.js')

const createTask = async (req, res) => {
    try {
        const { titolo, descrizione, data, priorita, salvato, utenteId } = req.body
        const newTask = new Task({ titolo, descrizione, data, priorita, salvato, utenteId })
        const dati = await newTask.save()

        res.status(200).json(dati)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getTasks = async (req, res) => {
    try {
      const datiTask = await Task.find()

      if (!datiTask || datiTask.length === 0) {
        return res.status(404).json({ message: "Dati task non trovati." })
      }

      res.status(200).json(datiTask)

    } catch (error) {
      res.status(500).json({ errorMessage: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.taskId

        const taskEsiste = await Task.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }

        res.status(200).json(taskEsiste)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getTasksByUtente = async (req, res) => {
    try {
        const utenteId = req.params.utenteId

        const tasks = await Task.find({ utenteId: utenteId })
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Nessuna task trovata per questo utente." })
        }

        res.status(200).json(tasks)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.taskId
        
        const taskEsiste = await Task.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }

        const updatedData = await Task.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(updatedData)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.taskId
        
        const taskEsiste = await Task.findById(id)
        if (!taskEsiste) {
            return res.status(404).json({ message: "Task non trovata." })
        }

        await Task.findByIdAndDelete(id)

        res.status(200).json({ message: "Task cancellata con successo." })
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

module.exports = { createTask, getTasks, getTask, getTasksByUtente, updateTask, deleteTask }