const mongoose = require('mongoose')


const exerciseSchema = new mongoose.Schema({
    userById: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    loads: {
        type: [{load: Number, reps: Number, note: String, date: {type: Date, default: Date.now}}],
        required: false
    },
})

module.exports = mongoose.model('Exercise', exerciseSchema)