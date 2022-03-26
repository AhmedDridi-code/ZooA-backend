const jwt = require('jsonwebtoken');
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
        console.log("not verified")
        res.status(401).json({message:"Auth failed!"})
    }

}