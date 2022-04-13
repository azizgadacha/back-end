const  mongoose=require("mongoose")

const Widget = new mongoose.Schema({

    superior_id:String,
    widgetName: String,
    type: String,
    label:Array,
    data:Array,
    date:{type:Date,
        default: new Date()

    },

},)

module.exports=mongoose.model("widget",Widget)