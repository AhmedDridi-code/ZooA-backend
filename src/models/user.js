const mongoose = require('mongoose');
var mongooseTypePhone = require('mongoose-type-phone');

const userSchema = mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    birthdate:{type:Date, required:true},
    phone:{type:mongoose.SchemaTypes.Phone, required:true},
    role:{type:string,required:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    username:{type:string, required:true},
    image: {type:string,default:null},
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating",
    }],
    totalRatings:{type:Number,default:0}

});


module.exports = mongoose.model("User",userSchema);