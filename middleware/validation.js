const { userSchema } = require('../schemas.js');
const { journeySchema } = require('../schemas.js');
const { reviewSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError')

module.exports.userValidation = (req, res, next) => {
    // Check if it catches an error after validating schemas.js
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.journeyValidation = (req, res, next) => {
    // Check if it catches an error after validating schemas.js
    const { error } = journeySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.reviewValidation = (req, res, next) => {
    // Check if it catches an error after validating schemas.js
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}