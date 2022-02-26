const  mongoose=require("mongoose")
const activeSession = new mongoose.Schema({
    id: String,

    token: String,

    userId: String,

    date: Date,
},)

module.exports=mongoose.model("activeSession",activeSession)