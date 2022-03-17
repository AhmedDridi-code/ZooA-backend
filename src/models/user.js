const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    birthdate:{type:Date, required:true},
    phone:{type:String, required:true,unique:true},
    role:{type:String,required:true,default:"user"},
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {type:String, required:true},
    image: {type:String,default:null},
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating",
    }],
    totalRatings:{type:Number,default:0}
});

module.exports = mongoose.model("User",userSchema);