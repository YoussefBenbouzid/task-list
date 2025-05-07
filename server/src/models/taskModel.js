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
    salvata: {
        type: Boolean,
        required: true,
        default: false
    },
    utenteId: {
        type: String,
        required: true
    },  
}, {
    collection: 'task'
})

module.exports = mongoose.model('Task', taskSchema)