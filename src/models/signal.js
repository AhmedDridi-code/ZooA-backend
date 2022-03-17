var mongoose  = require("mongoose"),
signalSchema = mongoose.Schema({
    date:{type:Date, required:true},
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    userSignaled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
module.exports = mongoose.model("Signal",signalSchema);