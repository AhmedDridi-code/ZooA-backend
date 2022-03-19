const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    description:String,
    image:[String] ,
    date:{type:Date, required:true, default:new Date()},
    user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  :"Comment"
        }
    ],
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  :"Like"
        }
    ],

});
module.exports = mongoose.model("Post",postSchema);
