const mysql = require('mysql')

let conectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orderscrud'
})
let hola = () => {

}

module.exports = {conectionDB,hola};
