const workspace =require('../model/workspace')
exports.shareWorkspace= async (req, res,next) => {
    const cardId= String(req.body.card_id);
    const userId= String(req.body.user_id);
    const UserName=String(req.body.user_username);
    console.log(typeof userId)
    console.log(userId)
    let ch=[userId,UserName]
    console.log(ch)
    console.log(UserName)
    console.log(req.body.user_username)
     workspace.findOneAndUpdate({_id:cardId},{$addToSet:{Share:ch}})
         .then((workspaceitems)=>{
             workspace.findOne({_id:cardId}).then((w)=>{
                 res.json({success:true,w})
             })
         })
         .catch(() => res.json({ success: false }));
}




