const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordinatorRequestSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('CoordinatorRequest', coordinatorRequestSchema);