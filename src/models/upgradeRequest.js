const mongoose=require('mongoose')
const upgradeRequestSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User" } , 
    date : { type:Date, required:true },
    upgradeTo : {type : String , required: true },  //upgradeTo : veterinaire | dresseur
    attachedFile : { type : String , required: false , default : null} , 
    description : { type : String , required: false , default : null} , 
    isValidated : {type  : Boolean  , required:true , default : false} 
})
module.exports=mongoose.model('upgradeRequest',upgradeRequestSchema)