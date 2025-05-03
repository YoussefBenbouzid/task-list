const mongoose = require('mongoose')

const utenteSchema = new mongoose.Schema({
    nomeUtente: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Utente', utenteSchema)