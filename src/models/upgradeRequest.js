const mongoose=require('mongoose')
const upgradeRequestSchema=mongoose.Schema({
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "User" } , 
    date : { type:Date, required:true },
    attachedFile : { type : String , required: false , default : null} , 
    isValidated : {type  : Boolean  , required:true , default : false} 
})
module.exports=mongoose.model('upgradeRequest',upgradeRequestSchema)