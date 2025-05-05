const Utente = require('../models/utenteModel.js')

const createUtente = async (req, res) => {
    try {
        const newUtente = new Utente(req.body)
        const { email } = newUtente

        const utenteEsistente = await Utente.findOne({ email })
        if (utenteEsistente) {
            return res.status(400).json({ message: "Utente già registrato." })
        }
        const dati = await newUtente.save()
        res.status(200).json(dati)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getAllUtenti = async (req, res) => {
    try {
        const datiUtente = await Utente.find()
        if (!datiUtente || datiUtente.length === 0) {
            return res.status(404).json({ message: "Dati utente non trovati." })
        }
        res.status(200).json(datiUtente)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getUtenteById = async (req, res) => {
    try {
        const id = req.params.id
        const utenteEsiste = await Utente.findById(id)
        if (!utenteEsiste) {
            return res.status(404).json({ message: "Utente non trovato." })
        }
        res.status(200).json(utenteEsiste)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const updateUtente = async (req, res) => {
    try {
        const id = req.params.id
        const utenteEsiste = await Utente.findById(id)
        if (!utenteEsiste) {
            return res.status(404).json({ message: "Utente non trovato." })
        }
        const updatedData = await Utente.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const deleteUtente = async (req, res) => {
    try {
        const id = req.params.id
        const utenteEsiste = await Utente.findById(id)
        if (!utenteEsiste) {
            return res.status(404).json({ message: "Utente non trovato." })
        }
        await Utente.findByIdAndDelete(id)
        res.status(200).json({ message: "Utente cancellato con successo." })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

module.exports = {
    createUtente,
    getAllUtenti,
    getUtenteById,
    updateUtente,
    deleteUtente
}