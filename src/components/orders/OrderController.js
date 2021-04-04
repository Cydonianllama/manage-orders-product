//response lib
const response = require('../../utils/response')
const orderService = require('../../services/OrderService')

const createOrder = (req,res) => {
    const newOrder = req.body;
    if(newOrder){
        orderService.createOrder(newOrder,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report', msg: result})
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no body founded' })
    }
}

const processOrder = (req,res) => {
    const idOrder = req.params.id;
    if(idOrder){
        orderService.processOrder(idOrder,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err})
            }else{
                response(res, 'success', { type: 'report', msg: result })
            }
        })
    } else{
        response(res, 'error', { type: 'error', msg: 'no id param' })
    }
}

const getOrdersByPage = (req,res) => {
    const page = req.params.page;
    if(!page){
        orderService.getOrdersByPage(page,(err,result)=>{
            if(err){
                response(res,'error',{type : 'error' , msg : 'error in query'})
            }else{
                response(res,'success',{type : 'orders' , msg : result})
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no page param' })
    }
}

const getOrder = (req,res) => {
    const idOrder = req.params.id
    if (idOrder){
        orderService.getOrder(idOrder,(err,result)=>{
            if(err){
                response(res,'error',{type : 'error' , msg : err})
            }else{
                response(res,'success',{type : 'order', msg : result})
            }
        })
    }else{
        response(res ,'error' ,
            {
                type : 'error'
            }
        );
    }
}

const updateOrder = (req,res) => {
    const newOrder = req.body;
    if(newOrder){
        orderService.updateOrder(newOrder,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report updated', msg: result })
            }
        })
    }else{
        response(res,'error',{type: 'error' , msg : 'no body founded'})
    }
}

const deleteOrder = (req,res) => {
    const idOrder = req.params.id;
    if(idOrder){
        orderService.deleteOrder(idOrder,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no param founded' })
    }

}

const addItemOrder = (req,res) => {
    const itemData = req.body;
    if(itemData){
        orderService.addItemOrder(itemData,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no body founded' })
    }
}

const removeItemOrder = (req,res) => {
    const idItem = req.params.id
    if(idItem){
        orderService.removeItemOrder(idItem,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no params founded' })
    }
}

const getItemsOrder = (req,res) =>{
    const idOrder = req.params.id;
    if(idOrder){
        orderService.getItemsOrder(idOrder,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'report', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'no params founded' })
    }
}

module.exports = {
    createOrder,
    processOrder,
    addItemOrder,
    removeItemOrder,
    getItemsOrder,
    getOrder,
    getOrdersByPage,
    updateOrder,
    deleteOrder,
}