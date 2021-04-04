const OrderRepository = require('../components/orders/OrderRepository')
class OrderService {
    constructor(
        orderRepository
    ){
        this.orderRepository = orderRepository;
    }
    processOrder(idOrder,callback){
        this.getOrder(idOrder,(err,orderReport)=>{
            if(!orderReport[0]){
                callback(['no order with this id in report'],null)
                return
            }
            if(err){
                callback(['error in query'],null)
            }else{
                const newOrder = orderReport[0];
                if(newOrder.state === 'finalized'){
                    callback(['proccess already finalized'],null)
                    return
                }
                newOrder.state = 'finalized'
                this.orderRepository.update(newOrder, (err, result) => {
                    callback(err, result)
                })

            }
        })
    }
    getOrdersByPage(page,callback){
        this.orderRepository.findByPage(page,(err,result)=>{
            callback(err,result)
        })
    }
    getOrder(idOrder,callback){
        this.orderRepository.find(idOrder,(err,result)=>{
            callback(err,result)
        })
    }
    createOrder(order,callback){
        this.orderRepository.create(order,(err,result)=>{
            callback(err,result)
        })
    }
    deleteOrder(idOrder,callback){
        this.orderRepository.removeItemsFromOrder(idOrder,(err,callback)=>{
            if(err){
                callback(['cant delete items'],null)
                return
            }else{
                this.orderRepository.delete(idOrder, (err, result) => {
                    callback(err, result)
                })
            }
        })
    }
    updateOrder(order,callback){
        this.orderRepository.update(order,(err,result)=>{
            callback(err,result)
        })
    }
    getItemsOrder(idOrder,callback){
        this.orderRepository.getItemsOrder(idOrder,(err,result)=>{
            callback(err,result)
        })
    }
    addItemOrder(item,callback){
        this.orderRepository.removeItemOrder(item,(err,result)=>{
            callback(err,result)
        })
    }
    removeItemOrder(idItem,callback){
        this.orderRepository.removeItemOrder(idItem,(err,result)=>{
            callback(err,result)
        })
    }
}
const orderService = new OrderService(new OrderRepository());
module.exports = orderService;