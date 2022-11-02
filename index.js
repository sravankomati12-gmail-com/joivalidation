const express = require('express');
require("./config/db")
const yaml = require('yamljs');
const swaggerload1 = require('swagger-ui-express');
const joi = require('joi');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var swaggerload=yaml.load('./swagger.yaml')
app.use("/",swaggerload1.serve,swaggerload1.setup(swaggerload))
// app.get("/", async (req, res) => {
//     res.json({ message: 'hello world' })
// })
app.use("/v1",require("./routes/user"))
const apiValidate = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
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
// applied joi validation
app.post("/new", apiValidate, async (req, res) => {
    res.json({ message: "Api is validated successfully" })
})

app.listen(8080, () => console.log("server is started"))