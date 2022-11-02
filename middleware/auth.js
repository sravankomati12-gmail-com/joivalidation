const joi = require('joi');
module.exports = {
    apiValidate: async (req, res, next) => {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).max(10).required()
        })
        const { error } = schema.validate(req.body)
        if (error) {
            res.json({ message: error.details[0].message })
        } else {
            next()
        }
    }
}