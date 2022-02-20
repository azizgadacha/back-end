const  mongoose=require("mongoose")
const user = new mongoose.Schema({

    id: String,


username: String,

email: String,


password: String,

date:Date,
},)

module.exports=mongoose.model("user",user)