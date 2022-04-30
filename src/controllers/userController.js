const _ = require('lodash')
const {ObjectId} = require('mongodb')
const {deleteReportsByUserId} =require('../controllers/reportsController')
const User = require('../models/user')

deleteUser= function(req, res){
    let id=req.params.id
    if(!ObjectId.isValid(id)){
        res.status(404).json({error : "Invalid ID"})
    }
    User.findOne({ _id : id})
    .then(user=>{
        if(user){
            user.remove();
           res.status(201).json({
               data : user
           })
        }else{
           res.status(404).json({
               message : "User not found"
           })
        }
        
    })
    .catch(error=>{
       res.status(401).json({
           errors : error
       })
    })
   
}
updateUser= async function(req, res){
    const id=req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).json({error : "Invalid ID"})
    }
    const body = _.pick(req.body,['email','password','lname','fname', 'phone','image', 'role','birthdate'])
    if(body.password){
        try {
            const salt= await bcrypt.genSalt();
            body.password= await bcrypt.hash(body.password , salt)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
   User.findByIdAndUpdate(id , {$set: body})
   .then(result=>{
        res.status(201).json(result)
    }).catch(err=>{
        res.status(404).json(err)
    })
}

findUserById= async function(req, res){
    let id= req.params.id
    if(!ObjectId.isValid(id)){
        return  res.status(404).json({error : "Invalid ID"})
    }
    let user=await checkUserExists(req, res)
    console.log(user);
 }

findAllUsers = function(req, res){
     User.find({role : { $ne : 'admin'}})
     .then(result=>{
        res.status(200).json(result)
     })
     .catch(error =>{
        res.status(404).json(error)
     })
 }



  function checkUserExists(req, res){
    let id= req.params.id
       
     return User.findById(id).exec()
     .then(user=>{return user})
     .catch(error=>{return "Error occured"})
            
        
            
     
}

 module.exports={
    deleteUser,updateUser,findUserById,findAllUsers, checkUserExists
 }


