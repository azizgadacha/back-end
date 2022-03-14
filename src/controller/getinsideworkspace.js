const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.getinsideworkspace= (req, res,next) => {
    const WorkspaceID= String(req.body._id);
    workspace.find({_id:WorkspaceID})
        .then((workspaceitems)=>{
            res.json({success: true, workspaceitems});
        })
        .catch(() => res.json({ success: false }));
}


