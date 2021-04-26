// Validation 
const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        userId: Joi.string().required()
    });
    // validate data
    return schema.validate(data);
}


module.exports = {
    registerValidation
}