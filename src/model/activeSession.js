const  mongoose=require("mongoose")
const activeSession = new mongoose.Schema({
token: String,

userId: String,
date:{type:Date,
    default: Date.now
    },
},)

module.exports=mongoose.model("activeSession",activeSession)