const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.getinsideworkspace= (req, res,next) => {
    const superior_id= String(req.body.superior_id);

    workspace.find({superior_id:superior_id})

        .then((workspaceitems)=>{
            console.log(superior_id)
            res.json({success: true, workspaceitems});
        })
        .catch(() => res.json({ success: false }));
}


