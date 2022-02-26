const  mongoose=require("mongoose")
const ForgetToken = new mongoose.Schema({
    token:String,



    email:String,
    expire:Date


},)

module.exports=mongoose.model("ForgetToken",ForgetToken)