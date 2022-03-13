var mongoose  = require("mongoose"),
appointmentSchema = mongoose.Schema({
    date:{type:Date, required:true},
    user :{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    veterinary :{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }, 
});
module.exports = mongoose.model("Appointment",commentSchema);