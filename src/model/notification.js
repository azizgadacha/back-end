
const  mongoose=require("mongoose")


const notification = new mongoose.Schema({
receiver:String,
    sender: String,
     type: String,
    read:Boolean,
    text:String,
    idNotified:String,
    date:{type:Date,
        default: Date.now
    },

},)

module.exports=mongoose.model("notification",notification)
