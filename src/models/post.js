const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    description:String,
    images : [String],
    date:{type:Date, required:true, default:new Date()},
    user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  :"Like"
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  :"Comment"
        }
    ],
    totalReports : {type:Number,default:0}

});
module.exports = mongoose.model("Post",postSchema);
