var mongoose  = require("mongoose"),
ratingSchema = mongoose.Schema({
    date:{type:Date, required:true},
    userRating :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    userRated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
module.exports = mongoose.model("Rating",ratingSchema);