const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add an Name']
    },
    countryCode: {
        type: Number,
        required: [true, 'Please add country Code']
    },
    number: {
        type: Number,
        required: [true, 'Please add Number']
    },
    email: {
        type: String,
        required: false,
        lowercase: true

    },
    address: {
        type: String,
        required: false,
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Contact', contactSchema)