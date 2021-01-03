const conn = require('../utils/conection')

const selectAll = async (callback) =>{
    conn.conectionDB.query(
        `
        SELECT 
        productInOrder.codeOrder , 
        productinorder.quantity,
        product.name_product , 
        product.tipo ,
        product.precioUnitario
        FROM Orders 
        INNER JOIN productInOrder 
        inner join product ON product.id_product = productInOrder.codeProduct;
        `
        ,callback)
}

const insertOne = async(callback) => {
    conn.conectionDB.query('',callback)
}


module.exports = {selectAll,insertOne}