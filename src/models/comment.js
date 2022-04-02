var mongoose  = require("mongoose"),
commentSchema = mongoose.Schema({
    text:String,
    date:{type:Date, required:true,default:new Date()},
    user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    post :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }

    
});
module.exports = mongoose.model("Comment",commentSchema);