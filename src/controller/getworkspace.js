const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.getworkspace= (req, res,next) => {
    const id= String(req.body.id);

            workspace.find({superior_id:id})
                .then((workspaceitems)=>{
                    /*let workspaceitems =[];
                    let workspaceitem={};
                    console.log("hani fama2")
                    console.log(workspaceitems)

                    for(let i=0;i<workspace.length;i++) {
                        workspaceitem.WorkspaceName =workspace[i].WorkspaceName;
                        workspaceitem.description=workspace[i].description;
                        workspaceitems.push({...workspaceitem});
                        */
  res.json({success: true, workspaceitems});


                    /*
                    let workspaceName =new Array();
                    let workspaceDescription = new Array();
                  for(let i=0;i<workspace.length;i++) {
                      workspaceName.push(workspace[i].WorkspaceName);
                      workspaceDescription.push(workspace[i].description);
                  }
                    res.json({success: true, workspace});


                     */


                })
                .catch(() => res.json({ success: false }));
        }


