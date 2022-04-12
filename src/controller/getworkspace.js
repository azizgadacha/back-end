const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.getworkspace= (req, res,next) => {
    const id= String(req.body.id);

            workspace.find({superior_id:id})
                .then((workspaceitems)=>{

  res.json({success: true, workspaceitems});





                })
                .catch(() => res.json({ success: false }));
        }


