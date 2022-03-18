const mongoose = require('mongoose');
const { Schema } = mongoose;
const { cloudinary } = require("../cloudinary");


const journeySchema = new Schema({
    name: {type: String, required: true},
    routes: [ 
        {
            city: { type: String, required: true },
            location: {type: String, required: true}
        }
     ],
    price: {type: Number, required: true, min: 1},
    images: [
        {
            url: String,
            filename: String
        }
    ],
    description: String,
    date: {type: Date, required: true},     //TODO: Add min to be after current date
    user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
})

// Delete images from cloudinary after deleting the journey
journeySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // delete images
        for (let img of doc.images) {
            await cloudinary.uploader.destroy(img.filename);
        }
    }
});

module.exports = mongoose.model('Journey', journeySchema);