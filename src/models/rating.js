var mongoose  = require("mongoose"),
ratingSchema = mongoose.Schema({
    value:{type:Number, required:true},
    date:{type:Date, required:true,default:new Date()},
    user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    userRated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
module.exports = mongoose.model("Rating",ratingSchema);