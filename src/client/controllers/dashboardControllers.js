const chkProduct = document.querySelectorAll('.chk-order')
const numberQuantity    = document.querySelectorAll('.quantity-product')
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

var counter_aux1 = 0;

var RowProductInformation = {
    indexR : 0,
    code : ''
}
var informationRowProductContainer = []

function gerenarateCodeForRowProduct(){
    let random = Math.floor(Math.random() * 1000000)
    let idGenerated = 'id-row-'+ random
    return idGenerated
}

function saveInformationRow(rowProdcuct){
    informationRowProductContainer.push(rowProdcuct)
}

function idGeneratorForProductInOrder(){
    let random = Math.floor(Math.random() * 1000000)
    let idGenerated = 'id-prod-' + random
    return idGenerated
}

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
    idProvitional : 0,
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
    //validate the input entries for correct process
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

const createCardProductOrder = ({ idProvitional , nameProduct, quantity, typeProduct, price }) => {
    let templateCard =
        `
    <div class = "card-product-order" data-code="${idProvitional}">
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
    return templateCard
}

const removeProductFromOrderContainer = (theInput) => {
    productsOrderContainer.childNodes.forEach(item => {
        if(item.tagName === 'DIV'){
            if (item.dataset.code === theInput.dataset.code) {
                item.remove()
                // theInput.dataset.added = "no" (is an error but im still let this)
            }
        }

    })
}

const addProductInOrderContainer = (template) => {
    let domSection = productsOrderContainer.innerHTML 
    productsOrderContainer.innerHTML  = domSection + template
}

const addConectionBetweenInputQuantityAndCard = (item) => {

    var checkbox_ = item
    var currentInputQuantity = item.parentNode.parentNode.childNodes[11].childNodes[1]

    // (technical debt) -> need to listen when the user put the number with the keybord

    //listener to change the value in quantity of product order
    //create the connection between the input of quantity and the card
    currentInputQuantity.addEventListener('click', (e) => {
        productsOrderContainer.childNodes.forEach(cardProduct => {
            
            var maxQuantity = parseInt(checkbox_.parentNode.parentNode.childNodes[3].innerText)
            if (cardProduct.tagName === 'DIV') {
                if (cardProduct.dataset.code === checkbox_.dataset.code) {
                    cardProduct.childNodes.forEach(dinamycSectionCard => {
                        if (dinamycSectionCard.tagName === 'DIV') {
                            if (dinamycSectionCard.classList.contains('data-actions')) {

                                //change in the view of the user (inneficient)
                                dinamycSectionCard.childNodes[1].innerText = checkbox_.value

                                // if the value is yet less than the inputs
                                let valueQuantity = parseInt(checkbox_.value)
                                if (maxQuantity <= valueQuantity) {
                                    checkbox_.max = valueQuantity
                                    return
                                } else {

                                    //operation with order -> modify a product (for submit operation) (inneficient)
                                    order.products.forEach((item_,index) => {
                                        if (item_.idProvitional === cardProduct.dataset.code){
                                            item_.quantity = parseInt(checkbox_.value)
                                        }
                                    })
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

// i have a problem with inmutability
const productJSON  =  ({nameProduct,price,quantity,typeProduct,idProvitional}) => {
    return {
        nameProduct,
        price,
        quantity,
        typeProduct,
        idProvitional
    }
}

const processProductInOrder = (item) => {
    // (Antipattern) when user add to cart this start in 1 (business logic -> still int development)
    item.value = 1

    //create the id 
    productInOrder.idProvitional = idGeneratorForProductInOrder()

    //the position values using the position of the childNodes
    productInOrder.nameProduct  = item.parentNode.parentNode.childNodes[1].innerText
    productInOrder.price        = parseFloat(item.parentNode.parentNode.childNodes[7].innerText)
    productInOrder.quantity     = item.value
    productInOrder.typeProduct  = item.parentNode.parentNode.childNodes[5].innerText

    item.dataset.code    = productInOrder.idProvitional;

    //operation with order -> update the current order (OBJECT) for submit
    order.products.push(productJSON(productInOrder))

    let productCard      = createCardProductOrder(productInOrder)
    addProductInOrderContainer(productCard)
}

const actionCheckBoxInRow = (checkCont) => {

    checkCont.forEach((item) => {

        //desactivate the input number for quantity of products
        //this item is the real checkbox
        if (item.tagName === 'INPUT') {
            if (item.disabled === false) {

                //desactivate numbers of input 
                item.disabled = true

                // default quantity in the input number (business logic -> still int development)
                item.parentNode.parentNode.childNodes[11].childNodes[1].value = 0

                //remove the card (view operation)
                removeProductFromOrderContainer(item)

                //operation with order -> remove product insert in order (for correct data submit)
                order.products.forEach((product_) => {
                    if (product_.idProvitional === item.dataset.code) {
                        //order.products.splice(index,-1)
                    }
                });

            }
            else if (item.disabled === true) {

                //activate number of input
                item.disabled = false

                //add in a container (firts add)
                processProductInOrder(item)

                //prevent override of my listener
                if (item.dataset.added === 'yes') return
                else {
                    //the connection for wath the changes in the time (the event listeners)
                    addConectionBetweenInputQuantityAndCard(item)
                }
                // the key that allows the creation of Cards 
   
                item.dataset.added = 'yes'
            }
        }
    })
}

//some problems -> i dont know clearly how (actionCheckBoxInRow) work -> ive create but i cant remember
const toggleActionRowProduct = (rowProduct) => {

    var checkCont = rowProduct.childNodes[11].childNodes

    //if i have a code is because the user check before
    if (rowProduct.dataset.codeR){
        actionCheckBoxInRow(checkCont)
    }
    //if i havent a code is because the user doesnt check before
    else{
        rowProduct.dataset.codeR = gerenarateCodeForRowProduct()
        RowProductInformation.code = rowProduct.dataset.codeR
        saveInformationRow(RowProductInformation)

        actionCheckBoxInRow(checkCont)
    }
}

//references the input quantity , and logic about the conection between card and quantity (for update view and object)
const ActionsIfRowIdChecked = (e) =>  {
    let rowProduct = e.target.parentNode.parentNode
    console.log(order.products)
    if (e.target.checked) toggleActionRowProduct(rowProduct) 
    else toggleActionRowProduct(rowProduct)  
}

function listenersRowProduct() {
    chkProduct.forEach((item) => {
        item.addEventListener('click', ActionsIfRowIdChecked)
    })
}

function app(){
    listenersRowProduct()
    listenersForms()
}

app()