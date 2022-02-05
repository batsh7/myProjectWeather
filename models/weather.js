const mongoose = require('mongoose')
const { stringify } = require('qs')

const weatherSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    city: {
        type: String,
    },
    temp: {
        type: Number,
    },
    wind: {
        speed: {
            type: String
        },
        deg: {
            type: Number
        }
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Weather', weatherSchema)