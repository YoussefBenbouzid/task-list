const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const Utente = require('../models/utenteModel.js')

const register = async (req, res) => {
    try {
        const { nomeUtente, email, password, foto } = req.body

        const utenteEsistente = await Utente.findOne({ nomeUtente })
        if (utenteEsistente) {
            return res.status(400).json({ message: "Utente già registrato." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUtente = new Utente({ nomeUtente, email, password: hashedPassword, foto })
        const dati = await newUtente.save()

        const token = jwt.sign(
            { id: dati._id, nomeUtente: dati.nomeUtente },
            process.env.SECRET_KEY,
            { expiresIn: '2h' }
        )

        res.status(201).json({ token, nomeUtente: dati.nomeUtente, email: dati.email, foto: dati.foto, id: dati._id })

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { nomeUtente, password } = req.body

        const utente = await Utente.findOne({ nomeUtente })
        if (!utente) {
            return res.status(401).json({ error: 'Utente non trovato.' })
        }

        const passwordMatch = await bcrypt.compare(password, utente.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password errata.' })
        }

        const token = jwt.sign(
            { id: utente._id, nomeUtente: utente.nomeUtente },
            process.env.SECRET_KEY,
            { expiresIn: '2h' }
        )
        
        res.status(200).json({ token, nomeUtente: utente.nomeUtente, email: utente.email, foto: utente.foto, id: utente._id })

    } catch (error) {
        console.error("Errore login:", error)
        res.status(500).json({ error: 'Accesso non riuscito', dettagli: error.message })
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout riuscito.' })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getUtente = async (req, res) => {
    try {
        const id = req.params.utenteId
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
        const id = req.params.utenteId

        const utenteEsiste = await Utente.findById(id)
        if (!utenteEsiste) {
            return res.status(404).json({ message: "Utente non trovato." })
        }

        const campiConsentiti = ['nomeUtente', 'email', 'password', 'foto']
        const datiAggiornati = {}

        for (let campo of campiConsentiti) {
            if (req.body[campo]) {
                datiAggiornati[campo] = req.body[campo]
            }
        }

        if (datiAggiornati.password) {
            datiAggiornati.password = await bcrypt.hash(datiAggiornati.password, 10)
        }

        const updatedData = await Utente.findByIdAndUpdate(id, datiAggiornati, { new: true })

        res.status(200).json(updatedData)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const deleteUtente = async (req, res) => {
    try {
        const id = req.params.utenteId
        
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

const getUtenti = async (req, res) => {
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

module.exports = { register, login, logout, getUtente, updateUtente, deleteUtente, getUtenti }