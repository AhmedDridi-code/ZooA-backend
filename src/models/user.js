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
    totalRatings:{type:Number,default:0}
});

module.exports = mongoose.model("User",userSchema);