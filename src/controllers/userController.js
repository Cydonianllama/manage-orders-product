const model = require('../models/userModel')
const bcrypt = require('bcrypt')

const login = (req,res) => {
    const {password} = req.body
    model.findUser(req.body,(err,result,fieldset)=>{
        if (err) res.send({success : err})
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password,salt, function (err, hash) {
                bcrypt.compare(password, hash,function(err,result){
                    res.send({result})
                })
            })
        })    
    })
}

const register = (req,res) =>{
    if (req.body === null || req.body === undefined) res.send({success : false})
    model.insertUser(req.body,(err,result,fieldset)=>{
        if (err) res.send({success : err})
        res.send({result})
    })
}

module.exports = {login,register}