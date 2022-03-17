const _link  = "localhost:3000/api/users/"
const User = require('../models/user')

module.exports.deleteUser= function(req, res){
    User.findOneAndDelete({ _id : req.params.id})
    .then(result=>{
        if(result){
           res.status(201).json({
               data : result
           })
        }else{
           res.status(404).json({
               message : "User not found"
           })
        }
        
    })
    .catch(error=>{
       res.status(401).json({
           errors : error.message
       })
    })
}


