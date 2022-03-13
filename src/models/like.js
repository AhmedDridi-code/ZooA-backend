var mongoose  = require("mongoose"),
likeSchema = mongoose.Schema({
    date:{type:Date, required:true},
    user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
});
module.exports = mongoose.model("Like",likeSchema);