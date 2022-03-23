const jwt = require('jsonwebtoken');
//this middleware add the user id and the token to the request (req.authData)
module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken=jwt.verify(token,"secret_this_should_be_longer");
        req.dataAuth=decodedToken;
        console.log(req.dataAuth);
        next()
    }catch(err){
        next()
    }

}