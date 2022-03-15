const  mongoose=require("mongoose")

const workspace = new mongoose.Schema({

    user_id:String,

    WorkspaceName: String,

    description: String,

    WorkspaceList:Array,

    date:{type:Date,
        default: new Date()
    },

},)

module.exports=mongoose.model("workspace",workspace)