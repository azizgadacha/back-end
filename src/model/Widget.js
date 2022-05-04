const  mongoose=require("mongoose")

const Widget = new mongoose.Schema({

    superior_id:String,
    WidgetName: String,
    type: String,
    label:Array,
    dataWidget:Array,
    date:{type:Date,
        default: Date.now

    },

},)

module.exports=mongoose.model("widget",Widget)