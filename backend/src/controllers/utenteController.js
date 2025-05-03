const Utente = require('../models/utenteModel.js')

export const create = async(req, res) => {
    try {
        const newUtente = new Utente(req.body)
        const {email} = newUtente

        const utenteEsistente = await Utente.findOne({email})
        if(utenteEsistente) {
            return res.status(400).json({message: "Utente già registrato."})
        }
        const dati = await newUtente.save()
        res.status(200).json(dati)
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getAllUtenti = async(req, res) => {
    try {
        const datiUtente = await Utente.find()
        if(!datiUtente || datiUtente={.length === 0) {
            return res.status(404).json({message: "Dati utente non trovati."})
        }
        res.status(200).json(datiUtente)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getUtenteById = async(req, res) => {
    try {
        const id = req.params.id
        const utenteEsiste = await Utente.findById(id)
        if (!utenteEsiste) {
            return res.status(404).json({ message: "Utente non trovato."})
        }
        res.status(200).json(utenteEsiste)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}