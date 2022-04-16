const  mongoose=require("mongoose")

const workspace = new mongoose.Schema({

    superior_id:{ type: String, ref: 'workspace' },

    WorkspaceName: String,

    description: String,
    Share:[String],
    date:{type:Date,
        default: new Date()

    },

},)

module.exports=mongoose.model("workspace",workspace)