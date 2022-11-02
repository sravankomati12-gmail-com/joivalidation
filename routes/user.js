const userContr = require('../controllers/user');
const express = require("express");
const userRout = express.Router();
userRout.post("/add",userContr.adduser)
userRout.get("/list",userContr.getALLuser)
userRout.get("/get",userContr.getbyid)
userRout.post("/update",userContr.updateuserbyid)
userRout.delete("/delete",userContr.deletebyid)
module.exports = userRout;
