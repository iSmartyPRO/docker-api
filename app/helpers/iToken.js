const {tokens} = require("../config")

module.exports.checkAuth = (req, res, next ) => {
    const result = {
        status: false
    }
    const isTokenExist = tokens.find( item => item.iToken === req.headers.itoken)
    if(isTokenExist){
        result.status = true
        next()
    } else {
        result.message = "Unauthorized"
    }
    if(!result.status) {
        res.status(401).json(result)
    }
}