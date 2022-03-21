const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.deleteworkspace= (req, res,next) => {


   /* var  id = req.body.superior_id;
    var WorkspaceName=String(req.body.WorkspaceName);
    while ((id!=null)||(WorkspaceName!=null)){
            workspace.find({WorkspaceName,superior_id:id})
                .then((w)=>{
                    id=w._id
                    workspace.findOne({superior_id:id})
                        .then((w1)=>{
                            id=w._id
                            WorkspaceName=w1.WorkspaceName

                    })
                    res.json({success: true, w});


                })

        }

    */



          const id = req.body.superior_id;
          const WorkspaceName=String(req.body.WorkspaceName);
          workspace.findOneAndDelete({WorkspaceName,superior_id:id})
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