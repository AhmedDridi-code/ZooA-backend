const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, "secret_this_should_be_longer");
            req.dataAuth ={email:decodedData.email,userId:decodedData.userId};
            
          } else {
            decodedData = jwt.decode(token);
            req.dataAuth = {email:null,userId:decodedData?.sub};
          } 
        console.log(req.dataAuth);
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:"Auth failed!"})
    }

}