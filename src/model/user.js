const  mongoose=require("mongoose")


const user = new mongoose.Schema({

username: String,

email: String,
phone:Number,

password: String,
photo:{
    data:Buffer,
    contentType:String
},
date:{type:Date,
    default: new Date()
},
    role:String

},)

module.exports=mongoose.model("user",user)