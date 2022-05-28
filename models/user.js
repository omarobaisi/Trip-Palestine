const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    authorization: { type: String, required: true, default: 'normal'},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

userSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model('User', userSchema);