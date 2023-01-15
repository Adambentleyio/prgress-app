const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)


const noteSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User' // refers to the _id of a user schema instance
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    completed: {
       type: Boolean,
       default: false
    }},
    {
        timestamps: true
    }
)

noteSchema.plugin(autoIncrement, {
    inc_field: 'note',
    id: 'noteNums',
    start_seq: 1
})

module.exports = mongoose.model('Note', noteSchema)