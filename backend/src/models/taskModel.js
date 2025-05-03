const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    titolo: {
        type: String,
        required: true,
    },
    descrizione: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    priorita: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Task', taskSchema)