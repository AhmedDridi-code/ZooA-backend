var mongoose  = require("mongoose") ; 
reportSchema = mongoose.Schema({
    date:{type:Date, required:true},
    sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    reported_post: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    description : {
        type : String,
        required : true
    }
    
});
module.exports = mongoose.model("Report",reportSchema);