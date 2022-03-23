const  mongoose=require("mongoose")

const workspace = new mongoose.Schema({

    user_id:String,

    WorkspaceName: String,

    description: String,

    date:{type:Date,
        default: new Date()

    },

},)

module.exports=mongoose.model("workspace",workspace)