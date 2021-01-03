const model = require('../models/productModel')

const getProducts = async (req,res) => {
    model.select((error,result,fieldset)=>{
        if(error) { res.send({})}
        else{
            res.render('pages/Dashboard',{result})
            // res.send(result)
        }
    })
}

const deleteProduct  = async () =>{

}

const updateProduct = async () => {

}

const createProduct = async () => {

}

module.exports = {getProducts}
