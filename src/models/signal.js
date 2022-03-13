var mongoose  = require("mongoose"),
signalSchema = mongoose.Schema({
    date:{type:Date, required:true},
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Signal"
    },
    userSignaled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Signal"
    }
});
module.exports = mongoose.model("Signal",signalSchema);