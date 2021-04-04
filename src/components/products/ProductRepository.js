const connection = require('../../utils/conection')
class ProductRepository {
    
    constructor(){

    }

    find(id,callback){
        if(id){
            connection.query(
                'select * from products where idProduct = ?',
                [id],
                (err,result)=>{
                    callback(err,result)
                }
            )
        }else{
            connection.query(
                'select * from products',
                (err,result)=>{
                    callback(err,result)
                }
                )
        }
    }

    findByPageNumber(page,callback){
        connection.query(
            'select * from products',
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    findByNameProduct(nameProduct,callback){
        connection.query(
            'select * from products where nameProduct = ? ',
            [nameProduct],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    findByTypeProduct(typeProduct,callback){
        connection.query(
            'select * from products where typeProduct = ?',
            [typeProduct],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    create(product,callback){
        const {
            idProduct,
	        nameProduct,
	        quantity,
	        meassurementType,
	        espec,
	        warehouseName,
	        typeProduct
        } = product
        connection.query(
            'insert into products set '+
                'idProduct = ? , '+
                'nameProduct = ?,'+
                'quantity = ?,'+
                'meassurementType = ?,'+
                'espec = ?,'+
                'warehouseName = ?,'+
                'typeProduct = ?'
            ,[
                idProduct,
                nameProduct,
                quantity,
                meassurementType,
                espec,
                warehouseName,
                typeProduct
            ],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    update(product,callback){
        const {
            idProduct,
            nameProduct,
            quantity,
            meassurementType,
            espec,
            warehouseName,
            typeProduct
        } = product
        connection.query(
            'update products set '+
                'nameProduct = ?,'+
                'quantity = ?,'+
                'meassurementType = ?,'+
                'espec = ?,'+
                'warehouseName = ?,'+
                'typeProduct = ? '+
                'where idProduct = ?'
            ,
            [
                nameProduct,
                quantity,
                meassurementType,
                espec,
                warehouseName,
                typeProduct,
                idProduct
            ],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    delete(idProduct,callback){
        connection.query(
            `delete from products where idProduct = '${idProduct}' `,
            (err,result)=>{
                callback(err,result)
            }
        )
    }

}

module.exports = ProductRepository;