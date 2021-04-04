const types = {
    success : {
        code : 200
    },
    error : {
        code : 501
    },
}
function response(res,type,msg){
    res.status(types[type].code).send(
        {
            type,
            msg,
        }
    )
}
module.exports = response;