const express = require('express')
const router = express.Router()
const model = require('../models/ordersModel')

router.get('/getAll',(req,res)=>{
    model.selectAll((error,result,fieldset) => {
        if (error) res.send({success : false})
        else{
            res.send(result)
        }
    })
})

router.get('getByCode/:code',(req,res) => {
    res.send({state : 'not implemented'})
})

router.post('/create',(req,res)=>{
    model.insertOne((error,result,fieldset)=>{
        if(error) res.send({success : false})
        else {
            res.send(result)
        }
    })
})

router.get('/update',(req,res) => {

})

module.exports = router