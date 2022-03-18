const Joi = require('joi');

module.exports.userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        email: Joi.number().required(),
        password: Joi.string().required(),
        phone: Joi.string().required()
    }).required()
});

module.exports.journeySchema = Joi.object({
    journey: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(1),
        images: Joi.string(),
        description: Joi.string(),
        date: Joi.string().required()
    }).required(),
    routes: Joi.array(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string(),
        rate: Joi.number().required()
    }).required()
});