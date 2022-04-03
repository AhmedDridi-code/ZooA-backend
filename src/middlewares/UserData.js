const jwt = require('jsonwebtoken');
//this middleware add the user id and the token to the request (req.authData)
module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, "secret_this_should_be_longer");
          
            req.dataAuth = decodedData?.id;
          } else {
            decodedData = jwt.decode(token);
            req.dataAuth.userId = decodedData?.sub;
          } 
        console.log(req.dataAuth);
        next()
    }catch(err){
        next()
    }

}




