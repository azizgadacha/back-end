const  mongoose=require("mongoose")

const data = new mongoose.Schema({


    title: String,
    label:Array,
    data:Array,
usedIn:Array

},)

module.exports=mongoose.model("data",data)
