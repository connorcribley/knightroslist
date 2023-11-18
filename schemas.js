const Joi = require('joi')

// Joi University Schema
module.exports.universitySchema = Joi.object({
    university: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        ISTuition: Joi.number().required().min(0),
        OOSTuition: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required(),
        public: Joi.string(),
        accreditation: Joi.string()
    }).required()
})