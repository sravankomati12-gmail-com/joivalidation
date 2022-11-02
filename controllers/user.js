const userSchema = require('../model/user');
const joi = require('joi');

module.exports = {
    adduser: async (req, res) => {
        const schema = joi.object({
            name: joi.string().min(3).required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).max(10).required()
        })
        const { error } = schema.validate(req.body)
        if (error) {
            res.json({ message: error.details[0].message })
        } else {
            const { name, email, password } = req.body
            await userSchema.create({ name, email, password })
            res.json("user is created")
        }
    },
     getALLuser: async (req, res) => {
        var result = await userSchema.find()
        res.json({ message: "user list", result })
    }, getbyid: async (req, res) => {
        const { id } = req.query
        var result = await userSchema.findById(id)
        res.json({ message: "get user by id", result })
    }, updateuserbyid: async (req, res) => {
        const schema = joi.object({
            id: joi.string().required().trim().min(24).max(24).label("Id"),
            name: joi.string().min(3).required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).max(10).required()
        })
        const { error } = schema.validate(req.body)
        if (error) {
            res.json({ message: error.details[0].message })
        } else {
            const { name, email, password, id } = req.body
            await userSchema.findByIdAndUpdate(id, { name, email, password })
            res.json("user is update")
        }
    }, deletebyid: async (req, res) => {
        const { id } = req.query
        await userSchema.findByIdAndDelete(id)
        res.json({ message: "this user is deleted" })
    }
}