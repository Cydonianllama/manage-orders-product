const productService = require('../../services/ProductService')
const response = require('../../utils/response')

const createProduct = (req,res) => {
    const newProduct = req.body;
    if(newProduct){
        productService.createProduct(newProduct,(err,result)=>{
            if(err){
                response(res,'error',{type : 'error' , msg : err})
            }else{
                response(res,'success',{type : 'products' , msg : result})
            }
        })
    }else{
        response(res,'error',{type : 'error' , msg : 'not body founded'})
    }
}

const deleteProduct = (req,res) => {
    const idProduct = req.params.id
    if(idProduct){
        productService.deleteProduct(idProduct,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'products', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'not params founded' })
    }
}

const updateProduct = (req,res) => {
    const newProduct = req.body
    if(newProduct){
        productService.updateProduct(newProduct,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'products', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'not params founded' })
    }
}

const getProductsByPage = (req,res) => {
    const page = req.params.page
    if(page){
        productService.getProductsByPage(page,(err,result)=>{
            if(err){
                response(res, 'error', { type: 'error', msg: err })
            }else{
                response(res, 'success', { type: 'products', msg: result })
            }
        })
    }else{
        response(res, 'error', { type: 'error', msg: 'not params founded' })
    }
}

const getProduct = (req,res) => {
    const idProduct = req.params.id
    if (idProduct) {
        productService.getProduct(idProduct, (err, result) => {
            if (err) {
                response(res, 'error', { type: 'error', msg: err })
            } else {
                response(res, 'success', { type: 'products', msg: result })
            }
        })
    } else {
        response(res, 'error', { type: 'error', msg: 'not params founded' })
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProductsByPage,
    getProduct
}