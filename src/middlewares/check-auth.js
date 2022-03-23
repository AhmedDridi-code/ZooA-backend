const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    try{
        console.log("verifying");
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken=jwt.verify(token,"secret_this_should_be_longer");
        console.log("verified")
        req.dataAuth=decodedToken;
        next();
    }catch(err){
        console.log("not verified")
        res.status(401).json({message:"Auth failed!"})
    }

}