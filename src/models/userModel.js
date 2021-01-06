const connection = require('../utils/conection')
const bcrypt = require('bcrypt')

const findUser = async (data,callback) => {
    const {username} = data
    connection.conectionDB.query(
        `select user_.password_
                from user_ where username_ = '${username}'`,
        callback)       

   
}

const insertUser = async (data,callback) => {
    const {username,password,fullname} = data
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,function(err,hash){
            connection.conectionDB.query(
                `insert into 
                user_(username_,password_,fullname) 
                values('${username}','${hash}','${fullname}')`,
                callback)
        })
    })
    
}

module.exports = {findUser,insertUser}

/*
app.get('/test/:mycode',async (req,res) => {

    const mycode = req.params.mycode
    const bcrypt = require('bcrypt')
    const saltRounds = 10

    var codeGenerated = ''

    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(mycode,salt,function(err,hash){
            codeGenerated = hash
            bcrypt.compare(mycode,hash).then(function (result) {
                console.log(result)
                res.send({ codeGenerated,result })
            })

        })
    })

})
*/