const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

const routesHome = require('./routes/routes.home')
const apiOrder = require('./api/apiOrder')
const apiProduct = require('./api/apiProduct')
const apiUser = require('./api/apiUser')

app.set('view engine','ejs')
app.use('/controllers',express.static(path.resolve('src','client','controllers')))
app.use('/styles',express.static(path.resolve('src','client','styles')))
app.set('views', path.resolve('src','views'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/',routesHome)
app.use('/api/order/',apiOrder)
app.use('/api/product',apiProduct)
app.use('/api/user',apiUser)

app.listen(PORT,(e) => {
    if (e) console.log(e)
    else console.log(`conection in PORT ${PORT}`)
})