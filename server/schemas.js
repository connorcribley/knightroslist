const Joi = require('joi')

// Joi University Schema
module.exports.universitySchema = Joi.object({
    university: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})