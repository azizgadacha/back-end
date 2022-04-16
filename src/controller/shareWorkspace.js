const workspace =require('../model/workspace')
exports.shareWorkspace= async (req, res,next) => {
    const cardId= String(req.body.card_id);
    const userId= String(req.body.user_id);

     workspace.findOneAndUpdate({_id:cardId},{$addToSet:{Share:userId}})
         .then((workspaceitems)=>{
             workspace.findOne({_id:cardId}).then((w)=>{
                 res.json({success:true,w})
             })
         })
         .catch(() => res.json({ success: false }));
}




