const  mongoose=require("mongoose")

const workspace = new mongoose.Schema({

    superior_id:{ type: String  },

    widgetName: String,

    description: String,
    type:String,
    header:Array,
    data:Array,
    date:{type:Date,
        default: new Date()

    },

},)

module.exports=mongoose.model("workspace",workspace)