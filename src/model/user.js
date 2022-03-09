const  mongoose=require("mongoose")
const {number} = require("joi");

const user = new mongoose.Schema({

username: String,

email: String,
phone:Number,

password: String,

date:{type:Date,
    default: new Date()
},
    role:String

},)

module.exports=mongoose.model("user",user)