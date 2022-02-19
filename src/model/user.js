const  mongoose=require("mongoose")
const user = new mongoose.Schema({
    id: String,


username: String,

email22: String,


password: String,

date:Date,
},)

module.exports=mongoose.model("user",user)