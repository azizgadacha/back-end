
const  mongoose=require("mongoose")


const notification = new mongoose.Schema({
receiver:String,
    sender: String,
     type: String,
    read:Boolean,
    name:String,
    date:{type:Date,
        default: new Date()
    },

},)

module.exports=mongoose.model("notification",notification)
