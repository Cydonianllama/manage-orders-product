const routes = require('./routes');

function router(app){
    routes.forEach(route => {
        app.use(route.name,route.controller);
    })
}

module.exports = router;