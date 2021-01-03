const conn = require('../utils/conection').conectionDB

async function select(callback) {
    conn.query('select * from product', callback)
}

module.exports = {select};