const  mongoose=require("mongoose")

const user = new mongoose.Schema({




username: String,

email: String,


password: String,

date:{type:Date,
    default: new Date()
},
},)

module.exports=mongoose.model("user",user)