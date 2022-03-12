const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.deleteworkspace= (req, res,next) => {


    const  id = req.body.user_id;
    const WorkspaceName=String(req.body.WorkspaceName);
            workspace.findOneAndDelete({WorkspaceName,user_id:id})
                .then((workspace)=>{
                    console.log(workspace)
                    let workspaceitems =[];
                    let workspaceitem={};
                    workspaceitem.WorkspaceName = workspace.WorkspaceName;
                    workspaceitem.description = workspace.description;
                    workspaceitems.push({...workspaceitem});

                    res.json({success: true, workspaceitems});
                })





}