var mongoose  = require("mongoose"),
likeSchema = mongoose.Schema({
    date:{type:Date, required:true, default:new Date()},
    user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
});
module.exports = mongoose.model("Like",likeSchema);