const connection = require('../../utils/conection');
class OrderRepository {
    
    constructor(){

    }

    find(id,callback){
        if(id){
            connection.query(
                `select * from orders where idOrder = '${id}' `,
                (err,result)=>{
                    callback(err,result)
                }
            )
        }else{
            connection.query(
                'select * from orders',
                (err,result)=>{
                    callback(err,result)
                }
            )
        }
    }

    findByPage(page,callback){
        connection.query(
            'select * from orders',
            (err,result)=>{
                callback(err,result)
            }
            )
    }

    create(order,callback){
        
        const {
            idOrder,
	        state,
	        dateOrder,
	        nameClient,
	        directionDelivery,
	        dateDelivery
        } = order

        connection.query(
            'insert into orders set '+
                'idOrder = ? , ' +
                'state = ? , '+
                'dateOrder = ? , '+
                'nameClient = ? , '+
                'directionDelivery = ? , '+
                'dateDelivery = ?'
            ,[
                idOrder,
                state,
                dateOrder,
                nameClient,
                directionDelivery,
                dateDelivery
            ],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    update(order, callback) {

        const {
            idOrder,
            state,
            dateOrder,
            nameClient,
            directionDelivery,
            dateDelivery
        } = order

        connection.query(
            'update orders set '+
                'state = ?,'+
                'dateOrder = ?,'+
                'nameClient = ?,'+
                'directionDelivery = ?,'+
                'dateDelivery = ? '+
                'where idOrder = ?'
            ,[
                state,
                dateOrder,
                nameClient,
                directionDelivery,
                dateDelivery,
                idOrder
            ],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    delete(id, callback) {
        connection.query(
            `delete from orders where idOrder = '${id}' `,
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    addItemOrder(item,callback){
        const {
            idOrderItem,
	        idProduct,
	        quantity
        } = item
        connection.query(
            `insert into orderitems set 
                idOrderItem = ?,
                idProduct = ?,
                quantity = ?
            `,[
                idOrderItem,
                idProduct,
                quantity
            ],
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    getItemsOrder(idOrder,callback){
        connection.query(
            `select * from orderitems where idOrder = '${idOrder}'`,
            (err,result)=>{
                callback(err,result)
            }
            )
    }

    removeItemOrder(idItem,callback){
        connection.query(
            `delete from orderitems where idOrderItem = '${idItem}'`,
            (err,result)=>{
                callback(err,result)
            }
        )
    }

    removeItemsFromOrder(idOrder,callback){
        connection.query(
            `delete from orderitems where idOrder = '${idOrder}'`,
            (err,result)=>{
                callback(err,result)
            }
        )
    }

}

module.exports = OrderRepository;