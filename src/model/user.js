
const  mongoose=require("mongoose")


const user = new mongoose.Schema({

username: String,

email: String,
phone:Number,

password: String,
photo:String,
date:{type:Date,
    default: Date.now
},
    role:String

},)

module.exports=mongoose.model("user",user)