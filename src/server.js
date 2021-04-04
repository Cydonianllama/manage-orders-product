const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000 ;

// middlewares
app.use( methodOverride('X-HTTP-Method-Override') )
app.use( express.json() );
// app.use( express.urlencoded( { extended: false } ) );

// view engine 
app.set('view engine','ejs')
app.set('views', path.resolve('src','views'))

const router = require('./router/router')
router(app);

app.listen(PORT,(err) => {
    let response = !err ? `conection in PORT ${PORT}` : 'error in connection';
    console.log(response);
})