const chkProduct = document.querySelectorAll('#chk-order')
const numberQuantity    = document.querySelectorAll('#quantity-product')
const rowProduct        = document.querySelectorAll('.row-product')

const inputNameCompany = document.getElementById('input-company-name')
const inputNameProduct  = document.getElementById('input-name-product')

const inputQuantityProduct      = document.getElementById('input-quantity-product')
const inputTypeProduct          = document.getElementById('input-type-product')
const inputUnitaryPriceProduct  = document.getElementById('input-unitary-price-product')

const btnCreateOrder    = document.getElementById('btn-create-order')
const btnCreateProduct  = document.getElementById('btn-create-product')

const productsOrderContainer    = document.getElementById('products-order-container')
const tableProducts             = document.getElementById('table-products')

var counterProductContainer = 0;

var product = {
    name: '',
    quantity: 0,
    type: '',
    unitaryPrice: 0.0
}

var order = {
    companyname: '',
    products: []
}

var productInOrder = {
    nameProduct: '',
    typeProduct : '',
    price : 0 ,
    quantity: 0,
    insertCode : (code) => {
        return code
    }
}

const createOrderForm = (e) => {
    let lookAndInsertSelectedItems = () => {
        rowProduct.forEach(item => {
            if (item.classList.contains('part-check')){
                console.log(item.firstChild)
            }
        })
    }
    lookAndInsertSelectedItems()
    order.companyname = inputNameCompany.value;
    e.preventDefault()
}

const isValidatedProductForm = () => {
    if (inputNameProduct.value === '') return false
    else if (inputQuantityProduct.value === '') return false
    else if (inputTypeProduct.value === '') return false
    else if (inputUnitaryPriceProduct.value === '') return false
    else return true 
}

const createProductForm = (e) =>{
    if (isValidatedProductForm() === false) { console.log('form not validated') ; return ;} 
    else{
        product.name = inputNameProduct.value
        product.quantity = inputQuantityProduct.value + 0
        product.type = inputTypeProduct.value
        product.unitaryPrice = inputUnitaryPriceProduct.value + 0
        console.table(product)
    }
    e.preventDefault()
}


const listenersForms = () => {
    btnCreateOrder.addEventListener('click',createOrderForm)
    btnCreateProduct.addEventListener('click',createProductForm)
}

//const objects = require('./objects')
const createCardProductOrder = ({nameProduct,quantity,typeProduct,price}) =>{
    let templateCard = 
    `
    <div class = "card-product-order" data-counter="${counterProductContainer}"  data-code="${counterProductContainer}">
        <div class ="information-product-order">
            <h2>${nameProduct}</h2>
            <ul>
                <li>${typeProduct}</li>
                <li>${price}</li>
            </ul>
        </div>
        <div class ="data-actions">
            <span data-quantity = >${quantity}</span>
            <button id = "btn-remove-card">x</button>
        </div>
    </div>
    `;
    counterProductContainer++;
    return templateCard
}

const removeProductFromOrderContainer = (theInput) => {
    productsOrderContainer.childNodes.forEach(item => {
        if(item.tagName === 'DIV'){
            if (item.dataset.code === theInput.dataset.code) {
                item.remove()
                theInput.dataset.added = "no"
            }
        }

    })
}

const addProductInOrderContainer = (template) => {
    let domSection = productsOrderContainer.innerHTML 
    productsOrderContainer.innerHTML  = domSection + template
}

const addConectionBetweenInputQuantityAndCard = (item) => {

    //lsitener to change the value in quantity of product order
    //create the connection between the input of quantity and the card
    
    item.parentNode.parentNode.childNodes[11].childNodes[1].addEventListener('click', (e) => {
        productsOrderContainer.childNodes.forEach(itemc => {
            
            //not overflow of quantity
            var isFull = false

            if (itemc.tagName === 'DIV') {
                if (itemc.dataset.code === item.dataset.code) {
                    itemc.childNodes.forEach(itemw => {
                        if (itemw.tagName === 'DIV') {
                            if (itemw.classList.contains('data-actions')) {
                                // if the value is yet less than the inputs
                                if (item.parentNode.parentNode.childNodes[3].innerText === item.value) {
                                    return
                                } else {
                                    itemw.childNodes[1].innerText = item.value
                                }

                            }
                        }
                    })
                }
            }
        })
        e.preventDefault()
    })   
    
    
}

const toggleInputQuantity= (node) => {

    node.forEach(item => {

        //desactivate the input number for quantity of products
        if (item.tagName === 'INPUT') {
            if (item.disabled === false){
                item.disabled = true
                item.parentNode.parentNode.childNodes[11].childNodes[1].value = 0

                //remove the card
                removeProductFromOrderContainer(item)

            }
            else if (item.disabled === true){
                item.disabled = false
                if(item.dataset.added === 'yes'){
                    return
                }
                else{
                    //the connection for wath the changes in the time
                    addConectionBetweenInputQuantityAndCard(item)

                    //when user add to cart this start in 1
                    item.value = 1

                    //the position values using the position of the childNodes
                    productInOrder.nameProduct = item.parentNode.parentNode.childNodes[1].innerText
                    productInOrder.price = item.parentNode.parentNode.childNodes[7].innerText
                    productInOrder.quantity = 1
                    productInOrder.typeProduct = item.parentNode.parentNode.childNodes[5].innerText
                    
                    item.dataset.code = counterProductContainer;
                    console.log(item.dataset.code)

                    let productCard = createCardProductOrder(productInOrder)
                    addProductInOrderContainer(productCard)
                }
                // the key that allows the creation of Cards 
                item.dataset.added = 'yes'
            }
        }
    })
}

const checkToOrderActions = (e) =>  {
    let item = e.target.parentNode.parentNode.childNodes[11].childNodes;
    if (e.target.checked) toggleInputQuantity(item) 
    else toggleInputQuantity(item)   
}

function listenersChk() {
    chkProduct.forEach((item) => {
        item.addEventListener('click',checkToOrderActions)
    })
}

const renderContainerProductOrder = () => {

} 

const renderTableProduct = () => {


}

function app(){
    listenersChk()
    listenersForms()
}

app()