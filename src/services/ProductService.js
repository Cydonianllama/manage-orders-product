const ProductRepository = require('../components/products/ProductRepository');
class ProductService {
    
    constructor(
        productRepository
    ){
        this.productRepository = productRepository;
    }

    createProduct(product,callback){
        this.productRepository.create(product,(err,result)=>{
            callback(err,result)
        })
    }

    updateProduct(product,callback){
        this.productRepository.update(product,(err,result)=>{
            callback(err,result)
        })
    }

    deleteProduct(idProduct,callback){
        this.productRepository.delete(idProduct,(err,result)=>{
            callback(err,result)
        })
    }

    getProductsByPage(page,callback){
        this.productRepository.findByPageNumber(page,(err,result)=>{
            callback(err,result)
        })
    }

    getProduct(idProduct,callback){
        this.productRepository.find(idProduct,(err,result)=>{
            callback(err,result)
        })
    }

}
const productService = new ProductService(new ProductRepository()) 
module.exports = productService;