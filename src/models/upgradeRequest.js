const mongoose=require('mongoose')
const upgradeRequestSchema=mongoose.Schema({
    _id : { type: mongoose.Schema.Types.ObjectId, ref: "User" } , 
    date : { type:Date, required:true },
    attachedFile : { type : string , required: false , default : null} , 
    isValidated : {type  : boolean , required:true , default : false} 
})