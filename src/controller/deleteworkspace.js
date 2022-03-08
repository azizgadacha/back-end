const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.deleteworkspace= (req, res,next) => {
    const token = String(req.body.token);
    const WorkspaceName=String(req.body.WorkspaceName);
    activeSession.find({token})
        .then((session)=>{
            let id= session[0].userId
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
        })
        .catch(()=>res.json({success:false}))




}