const productAPI = require('../api/APIproduct');
const orderAPI = require('../api/APIorder');
const applicationRoutes = require('./routesApplication');

const routes = [
    {
        name : '/',
        controller : applicationRoutes
    },
    {
        name : '/api/products',
        controller : productAPI
    },
    {
        name : '/api/orders',
        controller : orderAPI
    }
]

module.exports = routes;