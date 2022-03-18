const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

// TODO: Add a oneToFew relation to add the company details
// TODO: Add authorization (coordinator, admin)
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

// TODO: Delete user posts after deleted

module.exports = mongoose.model('User', userSchema);