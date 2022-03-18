const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeyRegisterSchema = new Schema({
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
    city: String,
    price: { type: Number, required: true },
    approved: Boolean,
    journey: {
        type: Schema.Types.ObjectId,
        ref: 'Journey',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('JourneyRegister', journeyRegisterSchema);