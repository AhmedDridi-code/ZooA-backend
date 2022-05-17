const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:{type:String, required:[true , "Firstname is required"]},
    lname:{type:String, required: [true , "Lastname is required"]},
    birthdate:{type:Date},
    phone:{type:String,unique:[true, "Phone Number already in use" ]},
    role:{type:String,required:true,default:"user"},
    email: {
        type: String,
        trim: true,
        unique: [true, "Email address already in use" ],
    },
    password: {type:String},
    image: {type:String,default:""},
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating",
    }],
    totalRatings:{type:Number,default:0 },
    adresse:{
        ville:{type:String, required:false},
        region:{type:String, required:false},
        street:{type:String, required:false},
    } 

});

userSchema.pre('remove',function(next) {
    
    const Report=mongoose.model('Report') ; 
    const Comments=mongoose.model('Comment') ; 
    const Posts=mongoose.model('Post') ; 
    const Likes=mongoose.model('Like') ; 
    const upgradeRequest = mongoose.model('upgradeRequest');
    //Remove All the reports sent by This user
    Report.remove({sender : this._id}).then(()=>{
        //Remove All the comments sent by this user
        Comments.remove({user : this._id}).then(()=>{
            //Remove All the posts of this user
            Posts.remove({user : this._id}).then(()=>{
                //Remove All the Likes of this user
                Likes.remove({user : this._id}).then(()=>{
                    //Remove UpgradeRequest sent by that user
                    upgradeRequest.remove({user : _id}).then(()=>next())
                })

            })
        })
        
    })
})

module.exports = mongoose.model("User",userSchema);