const UpgradeRequest = require('../models/upgradeRequest');
const {ObjectId} = require('mongodb') ;



module.exports.findAllUpgradeRequests=function(req, res){
    UpgradeRequest.find()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(error=>{
        res.status(404).json(error)
    })
}
module.exports.sendRequest=function(req, res){
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).json({error : "Invalid ID"})
    }
    let request= new UpgradeRequest({
        user_id : id,
        date: Date.now() , 
        attachedFile : req.file.filename , 
        isValidated : false });
    request.save()
           .then(result=>{
               res.status(200).json(result)
           })
           .catch(error=>{
            res.status(400).json(error)
           })
    
    
    



}