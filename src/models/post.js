const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    description:{type:String, required:true},
    image:string,
    date:{type:Date, required:true},
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
