var mongoose  = require("mongoose"),
commentSchema = mongoose.Schema({
    text:String,
    date:{type:Date, required:true},
    user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },

    
});
module.exports = mongoose.model("Comment",commentSchema);