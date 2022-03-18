const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    body: {type: String},
    rate: {type: Number, required: true, enum: [1,2,3,4,5]},
    user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    },
})

module.exports = mongoose.model('Review', reviewSchema);