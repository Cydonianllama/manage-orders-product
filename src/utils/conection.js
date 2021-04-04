const mysql = require('mysql')

let conectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basic_orders'
});

module.exports = conectionDB;
