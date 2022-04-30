const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    description:String,
    images : [String],
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
    ]
    ,
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
postSchema.pre('remove',function(next) {
     const Comments = mongoose.model('Comment') ; 
     
     Comments.remove({post : this._id}).then(()=>{
            next()
     })
})

module.exports = mongoose.model("Post",postSchema);
