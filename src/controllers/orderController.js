const model = require('../models/ordersModel')

const getOrders = async (req,res) => {
    model.selectAll((error,result,fildset) => {
        if (error) res.send({error : 'yes'})
        else {
            res.send(result)
        }
    })
}

const createOrder = async (req,res) => {
    model.insertOne((error,result,fieldset) => {
        if (error) res.send({succes: false})
        else {
            res.send(result)
        }
    })
}

module.exports = {getOrders,createOrder}