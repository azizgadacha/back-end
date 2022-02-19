const  mongoose=require("mongoose")
const user = new mongoose.Schema({
    id: String,


username: String,

ema3asbail22: String,


password: String,

date:Date,
},)

module.exports=mongoose.model("user",user)